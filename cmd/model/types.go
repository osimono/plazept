package model

type Identifiable interface {
	Identifier() int
}

type Unique struct {
	Id int `json:"id"`
}

func (u Unique) Identifier() int {
	return u.Id
}

type Item struct {
	Unique       `json:"unique"`
	Name         string  `json:"name"`
	Unit         string  `json:"unit"`
	PricePerUnit float32 `json:"pricePerUnit"`
}

type Ingredient struct {
	Item   Item    `json:"item"`
	Amount float32 `json:"amount"`
}

func (i Ingredient) Cost() float32 {
	return i.Item.PricePerUnit * i.Amount
}

type Recipe struct {
	Unique      `json:"unique"`
	Name        string       `json:"name"`
	Ingredients []Ingredient `json:"ingredients"`
}

func (r Recipe) Cost() float32 {
	var cost float32
	for _, ingredient := range r.Ingredients {
		cost += ingredient.Cost()
	}
	return cost
}
