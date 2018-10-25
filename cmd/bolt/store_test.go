package bolt

import (
	"github.com/boltdb/bolt"
	"github.com/osimono/plazept/cmd/model"
	"log"
	"testing"
)

func TestNewItem(t *testing.T) {
	db, err := bolt.Open("plazept-test.db", 0600, nil)
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	store := NewStore(db)
	sugar := model.Item{Name: "sugar"}
	sugar, _ = store.NewItem(sugar)
	store.NewItem(model.Item{Name: "salt"})
	store.NewItem(model.Item{Name: "vinegar"})

	allItems, _ := store.AllItems()
	for _, item := range allItems {
		log.Printf("found: %#v", item)
	}

	sugar.Name = "no more sugar"
	store.UpdateItem(sugar)
	item, _ := store.SingleItem(sugar.Id)
	log.Printf("after update: %#v", item)
}
