package model

import (
	"github.com/stretchr/testify/assert"
	"testing"
)

func TestCost(t *testing.T) {
	assertions := assert.New(t)
	potatoe := Item{Name: "potatoe", Unit: "gramm", PricePerUnit: 0.00066}
	oliveOil := Item{Name: "olive oil", Unit: "ml", PricePerUnit: 0.01295}
	garlic := Item{Name: "garlic", Unit: "gramm", PricePerUnit: 0.00993}
	potatoesIngredient := Ingredient{Item: potatoe, Amount: 200}
	oliveOilIngredient := Ingredient{Item: oliveOil, Amount: 10}
	garlicIngredient := Ingredient{Item: garlic, Amount: 2}
	smashedPotatoes := Recipe{Ingredients: []Ingredient{potatoesIngredient, oliveOilIngredient, garlicIngredient}}

	assertions.Equal(float32(0.28136), smashedPotatoes.Cost())
}
