package api

import (
	"encoding/json"
	"github.com/osimono/plazept/cmd/bolt"
	"github.com/osimono/plazept/cmd/model"
	"io/ioutil"
	"net/http"
	"strings"
)

type ItemHandler struct {
	Store bolt.Store
}

func (i ItemHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	method := r.Method

	switch strings.ToUpper(method) {
	case http.MethodGet:
		i.getAll(w, r)
	case http.MethodPost:
		i.createOne(w, r)
	case http.MethodPut:
		i.updateOne(w, r)
	case http.MethodDelete:
		i.deleteOne(w, r)
	}

}
func (i ItemHandler) getAll(w http.ResponseWriter, r *http.Request) {
	items, err := i.Store.AllItems()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	bytes, err := json.Marshal(items)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write(bytes)
}

func (i ItemHandler) createOne(w http.ResponseWriter, r *http.Request) {
	item, err := parseItem(r, w)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}

	newItem, err := i.Store.NewItem(item)

	bytes, err := json.Marshal(newItem)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	w.Write(bytes)
}

func (i ItemHandler) updateOne(w http.ResponseWriter, r *http.Request) {
	item, err := parseItem(r, w)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
	updatedItem, err := i.Store.UpdateItem(item)

	bytes, err := json.Marshal(updatedItem)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusAccepted)
	w.Write(bytes)
}

func (i ItemHandler) deleteOne(w http.ResponseWriter, r *http.Request) {
	item, err := parseItem(r, w)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
	err = i.Store.DeleteItem(item)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	
	w.WriteHeader(http.StatusAccepted)
}

func parseItem(r *http.Request, w http.ResponseWriter) (model.Item, error) {
	var item model.Item
	b, err := ioutil.ReadAll(r.Body)
	if err != nil {
		return item, err
	}
	err = json.Unmarshal(b, &item)
	if err != nil {
		return item, err
	}
	return item, nil
}
