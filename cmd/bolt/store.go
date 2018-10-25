package bolt

import (
	"encoding/json"
	"github.com/boltdb/bolt"
	"github.com/osimono/plazept/cmd/model"
	"sort"
	"strconv"
	"strings"
)

var items = []byte("items")

func NewStore(db *bolt.DB) Store {
	db.Update(func(tx *bolt.Tx) error {
		_, err := tx.CreateBucketIfNotExists(items)
		if err != nil {
			return err
		}
		return nil
	})
	return Store{db: db}
}

type Store struct {
	db *bolt.DB
}

func (s Store) NewItem(item model.Item) (model.Item, error) {
	err := s.db.Update(func(tx *bolt.Tx) error {
		bucket := tx.Bucket(items)
		id, _ := bucket.NextSequence()
		item.Id = int(id)
		return marshalAndInsert(item, bucket)
	})

	return item, err
}

func (s Store) UpdateItem(item model.Item) (model.Item, error) {
	err := s.db.Update(func(tx *bolt.Tx) error {
		bucket := tx.Bucket(items)
		return marshalAndInsert(item, bucket)
	})

	return item, err
}

func marshalAndInsert(v model.Identifiable, bucket *bolt.Bucket) error {
	buf, err := json.Marshal(v)
	if err != nil {
		return err
	}

	id := []byte(strconv.Itoa(v.Identifier()))
	return bucket.Put(id, buf)
}

func (s Store) DeleteItem(item model.Item) error {
	return s.db.Update(func(tx *bolt.Tx) error {
		bucket := tx.Bucket(items)
		return bucket.Delete([]byte(strconv.Itoa(item.Unique.Id)))
	})
}

func (s Store) AllItems() ([]model.Item, error) {
	var allItems []model.Item

	err := s.db.View(func(tx *bolt.Tx) error {
		return tx.Bucket(items).ForEach(func(k, v []byte) error {
			item := &model.Item{}
			err := json.Unmarshal(v, item)
			if err != nil {
				return err
			}
			allItems = append(allItems, *item)
			return nil
		})
	})

	sort.Slice(allItems, func(i, j int) bool {
		return strings.ToLower(allItems[i].Name) < strings.ToLower(allItems[j].Name)
	})

	return allItems, err
}

func (s Store) SingleItem(id int) (model.Item, error) {
	var item model.Item

	err := s.db.View(func(tx *bolt.Tx) error {
		bucket := tx.Bucket(items)
		return getAndUnmarshal(bucket, id, &item)
	})

	return item, err
}

func getAndUnmarshal(bucket *bolt.Bucket, id int, v interface{}) error {
	value := bucket.Get([]byte(strconv.Itoa(id)))
	return json.Unmarshal(value, &v)
}
