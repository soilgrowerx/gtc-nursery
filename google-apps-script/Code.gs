// Google Apps Script server-side code for Tree Inventory Platform

// Complete Tree dataset - extracted from the Next.js project (50 trees)
const TREE_DATA = [
  {
    "id": "43",
    "commonName": "Cypress, Bald",
    "botanicalName": "Taxodium distichum",
    "iNaturalistUrl": "https://www.inaturalist.org/search?q=Taxodium%20distichum",
    "category": "Large Trees",
    "description": "Cypress, Bald (Taxodium distichum) - A native tree perfect for landscaping projects.",
    "plantingCareInfo": "Plant in appropriate soil conditions. Water regularly during establishment period. Follow proper planting depth guidelines.",
    "companionPlants": [],
    "complementaryTrees": [],
    "sku": "CYP-BAL-043",
    "size": "1 Gallon",
    "price": 160,
    "quantityInStock": 6,
    "image": "https://placehold.co/300x200/228B22/FFFFFF?text=Cypress%2C%20Bald"
  },
  {
    "id": "44",
    "commonName": "Elm, American",
    "botanicalName": "Ulmus americana",
    "iNaturalistUrl": "https://www.inaturalist.org/search?q=Ulmus%20americana",
    "category": "Large Trees",
    "description": "Elm, American (Ulmus americana) - A native tree perfect for landscaping projects.",
    "plantingCareInfo": "Plant in appropriate soil conditions. Water regularly during establishment period. Follow proper planting depth guidelines.",
    "companionPlants": [],
    "complementaryTrees": [],
    "sku": "ELM-AME-044",
    "size": "1 Gallon",
    "price": 160,
    "quantityInStock": 0,
    "image": "https://placehold.co/300x200/228B22/FFFFFF?text=Elm%2C%20American"
  },
  {
    "id": "45",
    "commonName": "Elm, Cedar",
    "botanicalName": "Ulmus crassifolia",
    "iNaturalistUrl": "https://www.inaturalist.org/search?q=Ulmus%20crassifolia",
    "category": "Large Trees",
    "description": "Elm, Cedar (Ulmus crassifolia) - A native tree perfect for landscaping projects.",
    "plantingCareInfo": "Plant in appropriate soil conditions. Water regularly during establishment period. Follow proper planting depth guidelines.",
    "companionPlants": [],
    "complementaryTrees": [],
    "sku": "ELM-CED-045",
    "size": "1 Gallon",
    "price": 175,
    "quantityInStock": 9,
    "image": "https://placehold.co/300x200/228B22/FFFFFF?text=Elm%2C%20Cedar"
  },
  {
    "id": "46",
    "commonName": "Oak, Chinkapin",
    "botanicalName": "Quercus muehlenbergii",
    "iNaturalistUrl": "https://www.inaturalist.org/search?q=Quercus%20muehlenbergii",
    "category": "Large Trees",
    "description": "Oak, Chinkapin (Quercus muehlenbergii) - A native tree perfect for landscaping projects.",
    "plantingCareInfo": "Plant in appropriate soil conditions. Water regularly during establishment period. Follow proper planting depth guidelines.",
    "companionPlants": [],
    "complementaryTrees": [],
    "sku": "OAK-CHI-046",
    "size": "1 Gallon",
    "price": 175,
    "quantityInStock": 1,
    "image": "https://placehold.co/300x200/228B22/FFFFFF?text=Oak%2C%20Chinkapin"
  },
  {
    "id": "47",
    "commonName": "Oak, Mexican White",
    "botanicalName": "Quercus polymorpha",
    "iNaturalistUrl": "https://www.inaturalist.org/search?q=Quercus%20polymorpha",
    "category": "Large Trees",
    "description": "Oak, Mexican White (Quercus polymorpha) - A native tree perfect for landscaping projects.",
    "plantingCareInfo": "Plant in appropriate soil conditions. Water regularly during establishment period. Follow proper planting depth guidelines.",
    "companionPlants": [],
    "complementaryTrees": [],
    "sku": "OAK-MEX-WHI-047",
    "size": "1 Gallon",
    "price": 175,
    "quantityInStock": 10,
    "image": "https://placehold.co/300x200/228B22/FFFFFF?text=Oak%2C%20Mexican%20White"
  },
  {
    "id": "48",
    "commonName": "Pecan, Native",
    "botanicalName": "Carya illinoinensis",
    "iNaturalistUrl": "https://www.inaturalist.org/search?q=Carya%20illinoinensis",
    "category": "Large Trees",
    "description": "Pecan, Native (Carya illinoinensis) - A native tree perfect for landscaping projects.",
    "plantingCareInfo": "Plant in appropriate soil conditions. Water regularly during establishment period. Follow proper planting depth guidelines.",
    "companionPlants": [],
    "complementaryTrees": [],
    "sku": "PEC-NAT-048",
    "size": "1 Gallon",
    "price": 160,
    "quantityInStock": 4,
    "image": "https://placehold.co/300x200/228B22/FFFFFF?text=Pecan%2C%20Native"
  },
  {
    "id": "49",
    "commonName": "Redbud, Texas",
    "botanicalName": "Cercis canadensis var. texensis",
    "iNaturalistUrl": "https://www.inaturalist.org/search?q=Cercis%20canadensis%20var.%20texensis",
    "category": "Large Trees",
    "description": "Redbud, Texas (Cercis canadensis var. texensis) - A native tree perfect for landscaping projects.",
    "plantingCareInfo": "Plant in appropriate soil conditions. Water regularly during establishment period. Follow proper planting depth guidelines.",
    "companionPlants": [],
    "complementaryTrees": [],
    "sku": "RED-TEX-049",
    "size": "1 Gallon",
    "price": 175,
    "quantityInStock": 6,
    "image": "https://placehold.co/300x200/228B22/FFFFFF?text=Redbud%2C%20Texas"
  },
  {
    "id": "50",
    "commonName": "Willow, Desert 'Bubba'",
    "botanicalName": "Chilopsis linearis 'Bubba'",
    "iNaturalistUrl": "https://www.inaturalist.org/search?q=Chilopsis%20linearis%20'Bubba'",
    "category": "Large Trees",
    "description": "Willow, Desert 'Bubba' (Chilopsis linearis 'Bubba') - A native tree perfect for landscaping projects.",
    "plantingCareInfo": "Plant in appropriate soil conditions. Water regularly during establishment period. Follow proper planting depth guidelines.",
    "companionPlants": [],
    "complementaryTrees": [],
    "sku": "WIL-DES-BUB-050",
    "size": "1 Gallon",
    "price": 175,
    "quantityInStock": 3,
    "image": "https://placehold.co/300x200/228B22/FFFFFF?text=Willow%2C%20Desert%20'Bubba'"
  },
  {
    "id": "1",
    "commonName": "Anacua",
    "botanicalName": "Ehretia anacua",
    "iNaturalistUrl": "https://www.inaturalist.org/search?q=Ehretia%20anacua",
    "category": "Small Trees",
    "description": "Anacua (Ehretia anacua) - A native tree perfect for landscaping projects.",
    "plantingCareInfo": "Plant in appropriate soil conditions. Water regularly during establishment period. Follow proper planting depth guidelines.",
    "companionPlants": [],
    "complementaryTrees": [],
    "sku": "ANA-001",
    "size": "1 Gallon - 1G/16-20\"",
    "price": 14,
    "quantityInStock": 4,
    "image": "https://placehold.co/300x200/228B22/FFFFFF?text=Anacua"
  },
  {
    "id": "2",
    "commonName": "Ash, Wafer (Common Hoptree)",
    "botanicalName": "Ptelea trifoliata",
    "iNaturalistUrl": "https://www.inaturalist.org/search?q=Ptelea%20trifoliata",
    "category": "Small Trees",
    "description": "Ash, Wafer (Common Hoptree) (Ptelea trifoliata) - A native tree perfect for landscaping projects.",
    "plantingCareInfo": "Plant in appropriate soil conditions. Water regularly during establishment period. Follow proper planting depth guidelines.",
    "companionPlants": [],
    "complementaryTrees": [],
    "sku": "ASH-WAF-COM-HOP-002",
    "size": "1 Gallon - 1G/6-10\"",
    "price": 16,
    "quantityInStock": 4,
    "image": "https://placehold.co/300x200/228B22/FFFFFF?text=Ash%2C%20Wafer%20(Common%20Hoptree)"
  },
  {
    "id": "3",
    "commonName": "Basswood, Carolina",
    "botanicalName": "Tilia americana",
    "iNaturalistUrl": "https://www.inaturalist.org/search?q=Tilia%20americana",
    "category": "Small Trees",
    "description": "Basswood, Carolina (Tilia americana) - A native tree perfect for landscaping projects.",
    "plantingCareInfo": "Plant in appropriate soil conditions. Water regularly during establishment period. Follow proper planting depth guidelines.",
    "companionPlants": [],
    "complementaryTrees": [],
    "sku": "BAS-CAR-003",
    "size": "3-5 Gallon - 5G/36\"",
    "price": 50,
    "quantityInStock": 1,
    "image": "https://placehold.co/300x200/228B22/FFFFFF?text=Basswood%2C%20Carolina"
  },
  {
    "id": "4",
    "commonName": "Buckeye, Red (R)",
    "botanicalName": "Aesculus pavia",
    "iNaturalistUrl": "https://www.inaturalist.org/search?q=Aesculus%20pavia",
    "category": "Small Trees",
    "description": "Buckeye, Red (R) (Aesculus pavia) - A native tree perfect for landscaping projects.",
    "plantingCareInfo": "Plant in appropriate soil conditions. Water regularly during establishment period. Follow proper planting depth guidelines.",
    "companionPlants": [],
    "complementaryTrees": [],
    "sku": "BUC-RED-R-004",
    "size": "1 Gallon - 1G/1",
    "price": 18,
    "quantityInStock": 2,
    "image": "https://placehold.co/300x200/228B22/FFFFFF?text=Buckeye%2C%20Red%20(R)"
  },
  {
    "id": "5",
    "commonName": "Buckthorn, Carolina",
    "botanicalName": "Rhamnus caroliniana",
    "iNaturalistUrl": "https://www.inaturalist.org/search?q=Rhamnus%20caroliniana",
    "category": "Small Trees",
    "description": "Buckthorn, Carolina (Rhamnus caroliniana) - A native tree perfect for landscaping projects.",
    "plantingCareInfo": "Plant in appropriate soil conditions. Water regularly during establishment period. Follow proper planting depth guidelines.",
    "companionPlants": [],
    "complementaryTrees": [],
    "sku": "BUC-CAR-005",
    "size": "1 Gallon - 1G/6-12\"",
    "price": 14,
    "quantityInStock": 16,
    "image": "https://placehold.co/300x200/228B22/FFFFFF?text=Buckthorn%2C%20Carolina"
  },
  {
    "id": "6",
    "commonName": "Bumilia, Gum",
    "botanicalName": "Sideroxylon lanuginosum",
    "iNaturalistUrl": "https://www.inaturalist.org/search?q=Sideroxylon%20lanuginosum",
    "category": "Small Trees",
    "description": "Bumilia, Gum (Sideroxylon lanuginosum) - A native tree perfect for landscaping projects.",
    "plantingCareInfo": "Plant in appropriate soil conditions. Water regularly during establishment period. Follow proper planting depth guidelines.",
    "companionPlants": [],
    "complementaryTrees": [],
    "sku": "BUM-GUM-006",
    "size": "1 Gallon",
    "price": 14,
    "quantityInStock": 10,
    "image": "https://placehold.co/300x200/228B22/FFFFFF?text=Bumilia%2C%20Gum"
  },
  {
    "id": "7",
    "commonName": "Cherry, Escarpment (R)",
    "botanicalName": "Prunus serotina var. eximia",
    "iNaturalistUrl": "https://www.inaturalist.org/search?q=Prunus%20serotina%20var.%20eximia",
    "category": "Small Trees",
    "description": "Cherry, Escarpment (R) (Prunus serotina var. eximia) - A native tree perfect for landscaping projects.",
    "plantingCareInfo": "Plant in appropriate soil conditions. Water regularly during establishment period. Follow proper planting depth guidelines.",
    "companionPlants": [],
    "complementaryTrees": [],
    "sku": "CHE-ESC-R-007",
    "size": "1 Gallon - 1G/1",
    "price": 20,
    "quantityInStock": 3,
    "image": "https://placehold.co/300x200/228B22/FFFFFF?text=Cherry%2C%20Escarpment%20(R)"
  },
  {
    "id": "9",
    "commonName": "Cottonwood, Eastern",
    "botanicalName": "Populus deltoides",
    "iNaturalistUrl": "https://www.inaturalist.org/search?q=Populus%20deltoides",
    "category": "Small Trees",
    "description": "Cottonwood, Eastern (Populus deltoides) - A native tree perfect for landscaping projects.",
    "plantingCareInfo": "Plant in appropriate soil conditions. Water regularly during establishment period. Follow proper planting depth guidelines.",
    "companionPlants": [],
    "complementaryTrees": [],
    "sku": "COT-EAS-009",
    "size": "1 Gallon",
    "price": 14,
    "quantityInStock": 1,
    "image": "https://placehold.co/300x200/228B22/FFFFFF?text=Cottonwood%2C%20Eastern"
  },
  {
    "id": "8",
    "commonName": "Cottonwood, Eastern #2",
    "botanicalName": "Populus deltoides",
    "iNaturalistUrl": "https://www.inaturalist.org/search?q=Populus%20deltoides",
    "category": "Small Trees",
    "description": "Cottonwood, Eastern #2 (Populus deltoides) - A native tree perfect for landscaping projects.",
    "plantingCareInfo": "Plant in appropriate soil conditions. Water regularly during establishment period. Follow proper planting depth guidelines.",
    "companionPlants": [],
    "complementaryTrees": [],
    "sku": "COT-EAS-2-008",
    "size": "1 Gallon - 2/4-20\"",
    "price": 10,
    "quantityInStock": 3,
    "image": "https://placehold.co/300x200/228B22/FFFFFF?text=Cottonwood%2C%20Eastern%20%232"
  },
  {
    "id": "10",
    "commonName": "Cypress, Arizona 'Carolina Sapphire'",
    "botanicalName": "Cupressus arizonica",
    "iNaturalistUrl": "https://www.inaturalist.org/search?q=Cupressus%20arizonica",
    "category": "Small Trees",
    "description": "Cypress, Arizona 'Carolina Sapphire' (Cupressus arizonica) - A native tree perfect for landscaping projects.",
    "plantingCareInfo": "Plant in appropriate soil conditions. Water regularly during establishment period. Follow proper planting depth guidelines.",
    "companionPlants": [],
    "complementaryTrees": [],
    "sku": "CYP-ARI-CAR-SAP-010",
    "size": "3-5 Gallon - 5G/30-36\"",
    "price": 50,
    "quantityInStock": 2,
    "image": "https://placehold.co/300x200/228B22/FFFFFF?text=Cypress%2C%20Arizona%20'Carolina%20Sapphire'"
  },
  {
    "id": "11",
    "commonName": "Cypress, Bald",
    "botanicalName": "Taxodium distichum",
    "iNaturalistUrl": "https://www.inaturalist.org/search?q=Taxodium%20distichum",
    "category": "Small Trees",
    "description": "Cypress, Bald (Taxodium distichum) - A native tree perfect for landscaping projects.",
    "plantingCareInfo": "Plant in appropriate soil conditions. Water regularly during establishment period. Follow proper planting depth guidelines.",
    "companionPlants": [],
    "complementaryTrees": [],
    "sku": "CYP-BAL-011",
    "size": "3-5 Gallon - 5G/4-5'",
    "price": 35,
    "quantityInStock": 4,
    "image": "https://placehold.co/300x200/228B22/FFFFFF?text=Cypress%2C%20Bald"
  },
  {
    "id": "12",
    "commonName": "Cypress, Montezuma",
    "botanicalName": "Taxodium mucronatum",
    "iNaturalistUrl": "https://www.inaturalist.org/search?q=Taxodium%20mucronatum",
    "category": "Small Trees",
    "description": "Cypress, Montezuma (Taxodium mucronatum) - A native tree perfect for landscaping projects.",
    "plantingCareInfo": "Plant in appropriate soil conditions. Water regularly during establishment period. Follow proper planting depth guidelines.",
    "companionPlants": [],
    "complementaryTrees": [],
    "sku": "CYP-MON-012",
    "size": "3-5 Gallon - 5G/4-5'",
    "price": 35,
    "quantityInStock": 5,
    "image": "https://placehold.co/300x200/228B22/FFFFFF?text=Cypress%2C%20Montezuma"
  },
  {
    "id": "13",
    "commonName": "Dogwood, Roughleaf",
    "botanicalName": "Cornus drummondii",
    "iNaturalistUrl": "https://www.inaturalist.org/search?q=Cornus%20drummondii",
    "category": "Small Trees",
    "description": "Dogwood, Roughleaf (Cornus drummondii) - A native tree perfect for landscaping projects.",
    "plantingCareInfo": "Plant in appropriate soil conditions. Water regularly during establishment period. Follow proper planting depth guidelines.",
    "companionPlants": [],
    "complementaryTrees": [],
    "sku": "DOG-ROU-013",
    "size": "1 Gallon - 1G/6-12\"",
    "price": 14,
    "quantityInStock": 4,
    "image": "https://placehold.co/300x200/228B22/FFFFFF?text=Dogwood%2C%20Roughleaf"
  },
  {
    "id": "14",
    "commonName": "Elder, Box",
    "botanicalName": "Acer negundo",
    "iNaturalistUrl": "https://www.inaturalist.org/search?q=Acer%20negundo",
    "category": "Small Trees",
    "description": "Elder, Box (Acer negundo) - A native tree perfect for landscaping projects.",
    "plantingCareInfo": "Plant in appropriate soil conditions. Water regularly during establishment period. Follow proper planting depth guidelines.",
    "companionPlants": [],
    "complementaryTrees": [],
    "sku": "ELD-BOX-014",
    "size": "1 Gallon - 1G/30\"",
    "price": 14,
    "quantityInStock": 3,
    "image": "https://placehold.co/300x200/228B22/FFFFFF?text=Elder%2C%20Box"
  },
  {
    "id": "15",
    "commonName": "Elm, American",
    "botanicalName": "Ulmus americana",
    "iNaturalistUrl": "https://www.inaturalist.org/search?q=Ulmus%20americana",
    "category": "Small Trees",
    "description": "Elm, American (Ulmus americana) - A native tree perfect for landscaping projects.",
    "plantingCareInfo": "Plant in appropriate soil conditions. Water regularly during establishment period. Follow proper planting depth guidelines.",
    "companionPlants": [],
    "complementaryTrees": [],
    "sku": "ELM-AME-015",
    "size": "1 Gallon - 1G/24-30\"",
    "price": 14,
    "quantityInStock": 6,
    "image": "https://placehold.co/300x200/228B22/FFFFFF?text=Elm%2C%20American"
  },
  {
    "id": "16",
    "commonName": "Elm, Cedar",
    "botanicalName": "Ulmus crassifolia",
    "iNaturalistUrl": "https://www.inaturalist.org/search?q=Ulmus%20crassifolia",
    "category": "Small Trees",
    "description": "Elm, Cedar (Ulmus crassifolia) - A native tree perfect for landscaping projects.",
    "plantingCareInfo": "Plant in appropriate soil conditions. Water regularly during establishment period. Follow proper planting depth guidelines.",
    "companionPlants": [],
    "complementaryTrees": [],
    "sku": "ELM-CED-016",
    "size": "1 Gallon - 1G/12-24\"",
    "price": 14,
    "quantityInStock": 40,
    "image": "https://placehold.co/300x200/228B22/FFFFFF?text=Elm%2C%20Cedar"
  },
  {
    "id": "17",
    "commonName": "Hackberry, Sugar",
    "botanicalName": "Celtis laevigata",
    "iNaturalistUrl": "https://www.inaturalist.org/search?q=Celtis%20laevigata",
    "category": "Small Trees",
    "description": "Hackberry, Sugar (Celtis laevigata) - A native tree perfect for landscaping projects.",
    "plantingCareInfo": "Plant in appropriate soil conditions. Water regularly during establishment period. Follow proper planting depth guidelines.",
    "companionPlants": [],
    "complementaryTrees": [],
    "sku": "HAC-SUG-017",
    "size": "1 Gallon - 1G/20-36\"",
    "price": 14,
    "quantityInStock": 6,
    "image": "https://placehold.co/300x200/228B22/FFFFFF?text=Hackberry%2C%20Sugar"
  },
  {
    "id": "18",
    "commonName": "Holly, Yaupon 'Pride of Houston'",
    "botanicalName": "Ilex vomitoria",
    "iNaturalistUrl": "https://www.inaturalist.org/search?q=Ilex%20vomitoria",
    "category": "Small Trees",
    "description": "Holly, Yaupon 'Pride of Houston' (Ilex vomitoria) - A native tree perfect for landscaping projects.",
    "plantingCareInfo": "Plant in appropriate soil conditions. Water regularly during establishment period. Follow proper planting depth guidelines.",
    "companionPlants": [],
    "complementaryTrees": [],
    "sku": "HOL-YAU-PRI-OF-HOU-018",
    "size": "3-5 Gallon - 5G/18-36\"",
    "price": 40,
    "quantityInStock": 10,
    "image": "https://placehold.co/300x200/228B22/FFFFFF?text=Holly%2C%20Yaupon%20'Pride%20of%20Houston'"
  },
  {
    "id": "19",
    "commonName": "Mulberry, Texas (seed grown) (R)",
    "botanicalName": "Morus microphylla",
    "iNaturalistUrl": "https://www.inaturalist.org/search?q=Morus%20microphylla",
    "category": "Small Trees",
    "description": "Mulberry, Texas (seed grown) (R) (Morus microphylla) - A native tree perfect for landscaping projects.",
    "plantingCareInfo": "Plant in appropriate soil conditions. Water regularly during establishment period. Follow proper planting depth guidelines.",
    "companionPlants": [],
    "complementaryTrees": [],
    "sku": "MUL-TEX-SEE-GRO-R-019",
    "size": "1 Gallon - 1G/2",
    "price": 14,
    "quantityInStock": 6,
    "image": "https://placehold.co/300x200/228B22/FFFFFF?text=Mulberry%2C%20Texas%20(seed%20grown)%20(R)"
  },
  {
    "id": "20",
    "commonName": "Necklace, Eve's",
    "botanicalName": "Styphnolobium affine",
    "iNaturalistUrl": "https://www.inaturalist.org/search?q=Styphnolobium%20affine",
    "category": "Small Trees",
    "description": "Necklace, Eve's (Styphnolobium affine) - A native tree perfect for landscaping projects.",
    "plantingCareInfo": "Plant in appropriate soil conditions. Water regularly during establishment period. Follow proper planting depth guidelines.",
    "companionPlants": [],
    "complementaryTrees": [],
    "sku": "NEC-EVE-020",
    "size": "1 Gallon",
    "price": 14,
    "quantityInStock": 12,
    "image": "https://placehold.co/300x200/228B22/FFFFFF?text=Necklace%2C%20Eve's"
  },
  {
    "id": "29",
    "commonName": "Oak (Hybrid)",
    "botanicalName": "Quercus rysophylla (hybrid)",
    "iNaturalistUrl": "https://www.inaturalist.org/search?q=Quercus%20rysophylla%20(hybrid)",
    "category": "Small Trees",
    "description": "Oak (Hybrid) (Quercus rysophylla (hybrid)) - A native tree perfect for landscaping projects.",
    "plantingCareInfo": "Plant in appropriate soil conditions. Water regularly during establishment period. Follow proper planting depth guidelines.",
    "companionPlants": [],
    "complementaryTrees": [],
    "sku": "OAK-HYB-029",
    "size": "1 Gallon",
    "price": 20,
    "quantityInStock": 2,
    "image": "https://placehold.co/300x200/228B22/FFFFFF?text=Oak%20(Hybrid)"
  },
  {
    "id": "28",
    "commonName": "Oak (Mexican Native)",
    "botanicalName": "Quercus rysophylla",
    "iNaturalistUrl": "https://www.inaturalist.org/search?q=Quercus%20rysophylla",
    "category": "Small Trees",
    "description": "Oak (Mexican Native) (Quercus rysophylla) - A native tree perfect for landscaping projects.",
    "plantingCareInfo": "Plant in appropriate soil conditions. Water regularly during establishment period. Follow proper planting depth guidelines.",
    "companionPlants": [],
    "complementaryTrees": [],
    "sku": "OAK-MEX-NAT-028",
    "size": "1 Gallon - 1G/2",
    "price": 20,
    "quantityInStock": 4,
    "image": "https://placehold.co/300x200/228B22/FFFFFF?text=Oak%20(Mexican%20Native)"
  },
  {
    "id": "21",
    "commonName": "Oak, Blackjack",
    "botanicalName": "Quercus marilandica",
    "iNaturalistUrl": "https://www.inaturalist.org/search?q=Quercus%20marilandica",
    "category": "Small Trees",
    "description": "Oak, Blackjack (Quercus marilandica) - A native tree perfect for landscaping projects.",
    "plantingCareInfo": "Plant in appropriate soil conditions. Water regularly during establishment period. Follow proper planting depth guidelines.",
    "companionPlants": [],
    "complementaryTrees": [],
    "sku": "OAK-BLA-021",
    "size": "1 Gallon - 1G/2",
    "price": 16,
    "quantityInStock": 6,
    "image": "https://placehold.co/300x200/228B22/FFFFFF?text=Oak%2C%20Blackjack"
  },
  {
    "id": "22",
    "commonName": "Oak, Burr",
    "botanicalName": "Quercus macrocarpa",
    "iNaturalistUrl": "https://www.inaturalist.org/search?q=Quercus%20macrocarpa",
    "category": "Small Trees",
    "description": "Oak, Burr (Quercus macrocarpa) - A native tree perfect for landscaping projects.",
    "plantingCareInfo": "Plant in appropriate soil conditions. Water regularly during establishment period. Follow proper planting depth guidelines.",
    "companionPlants": [],
    "complementaryTrees": [],
    "sku": "OAK-BUR-022",
    "size": "3-5 Gallon - 5G/4-5'",
    "price": 55,
    "quantityInStock": 10,
    "image": "https://placehold.co/300x200/228B22/FFFFFF?text=Oak%2C%20Burr"
  },
  {
    "id": "23",
    "commonName": "Oak, Canby",
    "botanicalName": "Quercus canbyi",
    "iNaturalistUrl": "https://www.inaturalist.org/search?q=Quercus%20canbyi",
    "category": "Small Trees",
    "description": "Oak, Canby (Quercus canbyi) - A native tree perfect for landscaping projects.",
    "plantingCareInfo": "Plant in appropriate soil conditions. Water regularly during establishment period. Follow proper planting depth guidelines.",
    "companionPlants": [],
    "complementaryTrees": [],
    "sku": "OAK-CAN-023",
    "size": "3-5 Gallon - 5G/4-5'",
    "price": 45,
    "quantityInStock": 1,
    "image": "https://placehold.co/300x200/228B22/FFFFFF?text=Oak%2C%20Canby"
  },
  {
    "id": "24",
    "commonName": "Oak, Chinkapin",
    "botanicalName": "Quercus muehlenbergii",
    "iNaturalistUrl": "https://www.inaturalist.org/search?q=Quercus%20muehlenbergii",
    "category": "Small Trees",
    "description": "Oak, Chinkapin (Quercus muehlenbergii) - A native tree perfect for landscaping projects.",
    "plantingCareInfo": "Plant in appropriate soil conditions. Water regularly during establishment period. Follow proper planting depth guidelines.",
    "companionPlants": [],
    "complementaryTrees": [],
    "sku": "OAK-CHI-024",
    "size": "3-5 Gallon - 5G/36-60\"",
    "price": 40,
    "quantityInStock": 8,
    "image": "https://placehold.co/300x200/228B22/FFFFFF?text=Oak%2C%20Chinkapin"
  },
  {
    "id": "25",
    "commonName": "Oak, Chinkapin (Kerr Co)",
    "botanicalName": "Quercus muehlenbergii",
    "iNaturalistUrl": "https://www.inaturalist.org/search?q=Quercus%20muehlenbergii",
    "category": "Small Trees",
    "description": "Oak, Chinkapin (Kerr Co) (Quercus muehlenbergii) - A native tree perfect for landscaping projects.",
    "plantingCareInfo": "Plant in appropriate soil conditions. Water regularly during establishment period. Follow proper planting depth guidelines.",
    "companionPlants": [],
    "complementaryTrees": [],
    "sku": "OAK-CHI-KER-CO-025",
    "size": "1 Gallon - 1G/6-16\"",
    "price": 16,
    "quantityInStock": 5,
    "image": "https://placehold.co/300x200/228B22/FFFFFF?text=Oak%2C%20Chinkapin%20(Kerr%20Co)"
  },
  {
    "id": "26",
    "commonName": "Oak, Escarpment Live",
    "botanicalName": "Quercus fusiformis",
    "iNaturalistUrl": "https://www.inaturalist.org/search?q=Quercus%20fusiformis",
    "category": "Small Trees",
    "description": "Oak, Escarpment Live (Quercus fusiformis) - A native tree perfect for landscaping projects.",
    "plantingCareInfo": "Plant in appropriate soil conditions. Water regularly during establishment period. Follow proper planting depth guidelines.",
    "companionPlants": [],
    "complementaryTrees": [],
    "sku": "OAK-ESC-LIV-026",
    "size": "1 Gallon - 1G/4-10\"",
    "price": 16,
    "quantityInStock": 20,
    "image": "https://placehold.co/300x200/228B22/FFFFFF?text=Oak%2C%20Escarpment%20Live"
  },
  {
    "id": "27",
    "commonName": "Oak, Lacey",
    "botanicalName": "Quercus laceyi",
    "iNaturalistUrl": "https://www.inaturalist.org/search?q=Quercus%20laceyi",
    "category": "Small Trees",
    "description": "Oak, Lacey (Quercus laceyi) - A native tree perfect for landscaping projects.",
    "plantingCareInfo": "Plant in appropriate soil conditions. Water regularly during establishment period. Follow proper planting depth guidelines.",
    "companionPlants": [],
    "complementaryTrees": [],
    "sku": "OAK-LAC-027",
    "size": "3-5 Gallon - 5G/40-60\"",
    "price": 45,
    "quantityInStock": 5,
    "image": "https://placehold.co/300x200/228B22/FFFFFF?text=Oak%2C%20Lacey"
  },
  {
    "id": "30",
    "commonName": "Oak, Shumard Red",
    "botanicalName": "Quercus shumardii",
    "iNaturalistUrl": "https://www.inaturalist.org/search?q=Quercus%20shumardii",
    "category": "Small Trees",
    "description": "Oak, Shumard Red (Quercus shumardii) - A native tree perfect for landscaping projects.",
    "plantingCareInfo": "Plant in appropriate soil conditions. Water regularly during establishment period. Follow proper planting depth guidelines.",
    "companionPlants": [],
    "complementaryTrees": [],
    "sku": "OAK-SHU-RED-030",
    "size": "1 Gallon",
    "price": 12,
    "quantityInStock": 20,
    "image": "https://placehold.co/300x200/228B22/FFFFFF?text=Oak%2C%20Shumard%20Red"
  },
  {
    "id": "31",
    "commonName": "Oak, Vasey",
    "botanicalName": "Quercus vaseyana",
    "iNaturalistUrl": "https://www.inaturalist.org/search?q=Quercus%20vaseyana",
    "category": "Small Trees",
    "description": "Oak, Vasey (Quercus vaseyana) - A native tree perfect for landscaping projects.",
    "plantingCareInfo": "Plant in appropriate soil conditions. Water regularly during establishment period. Follow proper planting depth guidelines.",
    "companionPlants": [],
    "complementaryTrees": [],
    "sku": "OAK-VAS-031",
    "size": "1 Gallon - 1G/4-10\"",
    "price": 16,
    "quantityInStock": 20,
    "image": "https://placehold.co/300x200/228B22/FFFFFF?text=Oak%2C%20Vasey"
  },
  {
    "id": "32",
    "commonName": "Osage, Orange",
    "botanicalName": "Maclura pomifera",
    "iNaturalistUrl": "https://www.inaturalist.org/search?q=Maclura%20pomifera",
    "category": "Small Trees",
    "description": "Osage, Orange (Maclura pomifera) - A native tree perfect for landscaping projects.",
    "plantingCareInfo": "Plant in appropriate soil conditions. Water regularly during establishment period. Follow proper planting depth guidelines.",
    "companionPlants": [],
    "complementaryTrees": [],
    "sku": "OSA-ORA-032",
    "size": "1 Gallon - 1G/12-30\"",
    "price": 14,
    "quantityInStock": 29,
    "image": "https://placehold.co/300x200/228B22/FFFFFF?text=Osage%2C%20Orange"
  },
  {
    "id": "33",
    "commonName": "Persimmon, American",
    "botanicalName": "Diospyros virginiana",
    "iNaturalistUrl": "https://www.inaturalist.org/search?q=Diospyros%20virginiana",
    "category": "Small Trees",
    "description": "Persimmon, American (Diospyros virginiana) - A native tree perfect for landscaping projects.",
    "plantingCareInfo": "Plant in appropriate soil conditions. Water regularly during establishment period. Follow proper planting depth guidelines.",
    "companionPlants": [],
    "complementaryTrees": [],
    "sku": "PER-AME-033",
    "size": "3-5 Gallon - 5G/30-42\"",
    "price": 40,
    "quantityInStock": 6,
    "image": "https://placehold.co/300x200/228B22/FFFFFF?text=Persimmon%2C%20American"
  },
  {
    "id": "34",
    "commonName": "Redbud, Texas",
    "botanicalName": "Cercis canadensis var. texensis",
    "iNaturalistUrl": "https://www.inaturalist.org/search?q=Cercis%20canadensis%20var.%20texensis",
    "category": "Small Trees",
    "description": "Redbud, Texas (Cercis canadensis var. texensis) - A native tree perfect for landscaping projects.",
    "plantingCareInfo": "Plant in appropriate soil conditions. Water regularly during establishment period. Follow proper planting depth guidelines.",
    "companionPlants": [],
    "complementaryTrees": [],
    "sku": "RED-TEX-034",
    "size": "3-5 Gallon - 5G/3-5'",
    "price": 40,
    "quantityInStock": 4,
    "image": "https://placehold.co/300x200/228B22/FFFFFF?text=Redbud%2C%20Texas"
  },
  {
    "id": "35",
    "commonName": "Redbud, Texas (multi-stem)",
    "botanicalName": "Cercis canadensis var. texensis",
    "iNaturalistUrl": "https://www.inaturalist.org/search?q=Cercis%20canadensis%20var.%20texensis",
    "category": "Small Trees",
    "description": "Redbud, Texas (multi-stem) (Cercis canadensis var. texensis) - A native tree perfect for landscaping projects.",
    "plantingCareInfo": "Plant in appropriate soil conditions. Water regularly during establishment period. Follow proper planting depth guidelines.",
    "companionPlants": [],
    "complementaryTrees": [],
    "sku": "RED-TEX-MUL-035",
    "size": "3-5 Gallon - 5G/2-4'",
    "price": 35,
    "quantityInStock": 6,
    "image": "https://placehold.co/300x200/228B22/FFFFFF?text=Redbud%2C%20Texas%20(multi-stem)"
  },
  {
    "id": "36",
    "commonName": "Soapberry, Western",
    "botanicalName": "Sapindus saponaria var. drummondii",
    "iNaturalistUrl": "https://www.inaturalist.org/search?q=Sapindus%20saponaria%20var.%20drummondii",
    "category": "Small Trees",
    "description": "Soapberry, Western (Sapindus saponaria var. drummondii) - A native tree perfect for landscaping projects.",
    "plantingCareInfo": "Plant in appropriate soil conditions. Water regularly during establishment period. Follow proper planting depth guidelines.",
    "companionPlants": [],
    "complementaryTrees": [],
    "sku": "SOA-WES-036",
    "size": "1 Gallon - 1G/10-14\"",
    "price": 14,
    "quantityInStock": 8,
    "image": "https://placehold.co/300x200/228B22/FFFFFF?text=Soapberry%2C%20Western"
  },
  {
    "id": "37",
    "commonName": "Sycamore, American",
    "botanicalName": "Platanus occidentalis",
    "iNaturalistUrl": "https://www.inaturalist.org/search?q=Platanus%20occidentalis",
    "category": "Small Trees",
    "description": "Sycamore, American (Platanus occidentalis) - A native tree perfect for landscaping projects.",
    "plantingCareInfo": "Plant in appropriate soil conditions. Water regularly during establishment period. Follow proper planting depth guidelines.",
    "companionPlants": [],
    "complementaryTrees": [],
    "sku": "SYC-AME-037",
    "size": "1 Gallon - 1G/10-20\"",
    "price": 14,
    "quantityInStock": 16,
    "image": "https://placehold.co/300x200/228B22/FFFFFF?text=Sycamore%2C%20American"
  },
  {
    "id": "38",
    "commonName": "Sycamore, Arizona (AZ native)",
    "botanicalName": "Platanus wrightii",
    "iNaturalistUrl": "https://www.inaturalist.org/search?q=Platanus%20wrightii",
    "category": "Small Trees",
    "description": "Sycamore, Arizona (AZ native) (Platanus wrightii) - A native tree perfect for landscaping projects.",
    "plantingCareInfo": "Plant in appropriate soil conditions. Water regularly during establishment period. Follow proper planting depth guidelines.",
    "companionPlants": [],
    "complementaryTrees": [],
    "sku": "SYC-ARI-AZ-NAT-038",
    "size": "1 Gallon - 1G/24\"",
    "price": 14,
    "quantityInStock": 5,
    "image": "https://placehold.co/300x200/228B22/FFFFFF?text=Sycamore%2C%20Arizona%20(AZ%20native)"
  },
  {
    "id": "39",
    "commonName": "Walnut, Black",
    "botanicalName": "Juglans nigra",
    "iNaturalistUrl": "https://www.inaturalist.org/search?q=Juglans%20nigra",
    "category": "Small Trees",
    "description": "Walnut, Black (Juglans nigra) - A native tree perfect for landscaping projects.",
    "plantingCareInfo": "Plant in appropriate soil conditions. Water regularly during establishment period. Follow proper planting depth guidelines.",
    "companionPlants": [],
    "complementaryTrees": [],
    "sku": "WAL-BLA-039",
    "size": "1 Gallon - 1G/6-10\"",
    "price": 14,
    "quantityInStock": 1,
    "image": "https://placehold.co/300x200/228B22/FFFFFF?text=Walnut%2C%20Black"
  },
  {
    "id": "42",
    "commonName": "Willow, Black",
    "botanicalName": "Salix nigra",
    "iNaturalistUrl": "https://www.inaturalist.org/search?q=Salix%20nigra",
    "category": "Small Trees",
    "description": "Willow, Black (Salix nigra) - A native tree perfect for landscaping projects.",
    "plantingCareInfo": "Plant in appropriate soil conditions. Water regularly during establishment period. Follow proper planting depth guidelines.",
    "companionPlants": [],
    "complementaryTrees": [],
    "sku": "WIL-BLA-042",
    "size": "1 Gallon - 1G/24-36\"",
    "price": 14,
    "quantityInStock": 1,
    "image": "https://placehold.co/300x200/228B22/FFFFFF?text=Willow%2C%20Black"
  },
  {
    "id": "41",
    "commonName": "Willow, Desert 'Bubba'",
    "botanicalName": "Chilopsis linearis",
    "iNaturalistUrl": "https://www.inaturalist.org/search?q=Chilopsis%20linearis",
    "category": "Small Trees",
    "description": "Willow, Desert 'Bubba' (Chilopsis linearis) - A native tree perfect for landscaping projects.",
    "plantingCareInfo": "Plant in appropriate soil conditions. Water regularly during establishment period. Follow proper planting depth guidelines.",
    "companionPlants": [],
    "complementaryTrees": [],
    "sku": "WIL-DES-BUB-041",
    "size": "3-5 Gallon - 5G/36\"",
    "price": 40,
    "quantityInStock": 7,
    "image": "https://placehold.co/300x200/228B22/FFFFFF?text=Willow%2C%20Desert%20'Bubba'"
  },
  {
    "id": "40",
    "commonName": "Willow, Desert (Wild type)",
    "botanicalName": "Chilopsis linearis",
    "iNaturalistUrl": "https://www.inaturalist.org/search?q=Chilopsis%20linearis",
    "category": "Small Trees",
    "description": "Willow, Desert (Wild type) (Chilopsis linearis) - A native tree perfect for landscaping projects.",
    "plantingCareInfo": "Plant in appropriate soil conditions. Water regularly during establishment period. Follow proper planting depth guidelines.",
    "companionPlants": [],
    "complementaryTrees": [],
    "sku": "WIL-DES-WIL-TYP-040",
    "size": "1 Gallon - 1G/6-10\"",
    "price": 14,
    "quantityInStock": 10,
    "image": "https://placehold.co/300x200/228B22/FFFFFF?text=Willow%2C%20Desert%20(Wild%20type)"
  }
];

/**
 * Main function to serve the HTML web app
 * Required for Google Apps Script web apps
 */
function doGet(e) {
  return HtmlService.createTemplateFromFile('index')
    .evaluate()
    .setTitle('Greentree Co. - Tree Inventory')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/**
 * Server-side function to get all inventory data
 * Called from client-side JavaScript
 */
function getInventory() {
  try {
    return {
      success: true,
      data: TREE_DATA,
      totalCount: TREE_DATA.length,
      categories: [...new Set(TREE_DATA.map(tree => tree.category))],
      priceRange: {
        min: Math.min(...TREE_DATA.map(t => t.price)),
        max: Math.max(...TREE_DATA.map(t => t.price))
      }
    };
  } catch (error) {
    console.error('Error getting inventory:', error);
    return {
      success: false,
      error: error.toString(),
      data: []
    };
  }
}

/**
 * Server-side function to get a specific tree by ID
 * Called from client-side JavaScript
 */
function getTreeById(treeId) {
  try {
    const tree = TREE_DATA.find(t => t.id === treeId);
    if (!tree) {
      return {
        success: false,
        error: 'Tree not found',
        data: null
      };
    }
    
    return {
      success: true,
      data: tree
    };
  } catch (error) {
    console.error('Error getting tree by ID:', error);
    return {
      success: false,
      error: error.toString(),
      data: null
    };
  }
}

/**
 * Server-side function to filter trees
 * Called from client-side JavaScript
 */
function searchTrees(searchTerm, category, minPrice, maxPrice, availabilityFilter) {
  try {
    let filtered = TREE_DATA.filter(tree => {
      // Search term filter
      const matchesSearch = !searchTerm || 
        tree.commonName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tree.botanicalName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tree.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tree.sku.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Category filter
      const matchesCategory = !category || tree.category === category;
      
      // Price range filter
      const matchesPrice = tree.price >= (minPrice || 0) && tree.price <= (maxPrice || 9999);
      
      // Availability filter
      const matchesAvailability = !availabilityFilter || availabilityFilter === 'all' || (() => {
        switch (availabilityFilter) {
          case 'inStock': return tree.quantityInStock > 5;
          case 'lowStock': return tree.quantityInStock > 0 && tree.quantityInStock <= 5;
          case 'outOfStock': return tree.quantityInStock === 0;
          default: return true;
        }
      })();
      
      return matchesSearch && matchesCategory && matchesPrice && matchesAvailability;
    });
    
    return {
      success: true,
      data: filtered,
      totalCount: filtered.length
    };
  } catch (error) {
    console.error('Error searching trees:', error);
    return {
      success: false,
      error: error.toString(),
      data: []
    };
  }
}

/**
 * Utility function to include HTML files
 * Required for Google Apps Script templating
 */
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

/**
 * Server-side function to log user actions
 * Called from client-side JavaScript for analytics
 */
function logAction(action, data) {
  try {
    console.log('User Action:', action, JSON.stringify(data));
    return { success: true };
  } catch (error) {
    console.error('Error logging action:', error);
    return { success: false, error: error.toString() };
  }
}

/**
 * Server-side function to get app metadata
 * Called from client-side JavaScript
 */
function getAppMetadata() {
  return {
    appName: 'Greentree Co. Tree Inventory',
    version: '1.0.0',
    totalTrees: TREE_DATA.length,
    lastUpdated: new Date().toISOString(),
    categories: [...new Set(TREE_DATA.map(tree => tree.category))].sort()
  };
}

// Sample client request data for business operations
const SAMPLE_CLIENT_REQUESTS = [
  {
    id: 'REQ-001',
    clientName: 'Austin Parks & Recreation',
    email: 'procurement@austintexas.gov',
    phone: '(512) 974-6700',
    requestDate: '2024-06-15',
    status: 'pending',
    priority: 'high',
    projectType: 'Municipal Landscaping',
    requestedTrees: [
      { treeId: '30', commonName: 'Oak, Shumard Red', quantity: 25, unitPrice: 12 },
      { treeId: '26', commonName: 'Oak, Escarpment Live', quantity: 15, unitPrice: 16 },
      { treeId: '16', commonName: 'Elm, Cedar', quantity: 30, unitPrice: 14 }
    ],
    totalValue: 970,
    notes: 'Needed for Zilker Park restoration project. Delivery required by August 15th.',
    deliveryAddress: '2100 Barton Springs Rd, Austin, TX 78746'
  },
  {
    id: 'REQ-002',
    clientName: 'Highland Homes',
    email: 'landscaping@highland-homes.com',
    phone: '(512) 478-8500',
    requestDate: '2024-06-18',
    status: 'approved',
    priority: 'medium',
    projectType: 'Residential Development',
    requestedTrees: [
      { treeId: '49', commonName: 'Redbud, Texas', quantity: 12, unitPrice: 175 },
      { treeId: '18', commonName: 'Holly, Yaupon Pride of Houston', quantity: 8, unitPrice: 40 },
      { treeId: '34', commonName: 'Redbud, Texas', quantity: 10, unitPrice: 40 }
    ],
    totalValue: 2720,
    notes: 'For new subdivision in Cedar Park. Phase 1 of 3-phase project.',
    deliveryAddress: '1400 E Whitestone Blvd, Cedar Park, TX 78613'
  },
  {
    id: 'REQ-003',
    clientName: 'University of Texas',
    email: 'facilities@utexas.edu',
    phone: '(512) 471-3434',
    requestDate: '2024-06-20',
    status: 'quoted',
    priority: 'low',
    projectType: 'Campus Beautification',
    requestedTrees: [
      { treeId: '43', commonName: 'Cypress, Bald', quantity: 6, unitPrice: 160 },
      { treeId: '48', commonName: 'Pecan, Native', quantity: 4, unitPrice: 160 },
      { treeId: '22', commonName: 'Oak, Burr', quantity: 8, unitPrice: 55 }
    ],
    totalValue: 2000,
    notes: 'Campus sustainability initiative. Flexible timeline.',
    deliveryAddress: '110 Inner Campus Dr, Austin, TX 78712'
  },
  {
    id: 'REQ-004',
    clientName: 'Four Points Landscape Co.',
    email: 'orders@fourpointslandscape.com',
    phone: '(512) 266-7300',
    requestDate: '2024-06-19',
    status: 'fulfilled',
    priority: 'high',
    projectType: 'Commercial Landscaping',
    requestedTrees: [
      { treeId: '32', commonName: 'Osage, Orange', quantity: 20, unitPrice: 14 },
      { treeId: '37', commonName: 'Sycamore, American', quantity: 15, unitPrice: 14 },
      { treeId: '5', commonName: 'Buckthorn, Carolina', quantity: 10, unitPrice: 14 }
    ],
    totalValue: 630,
    notes: 'Regular customer. Delivery completed successfully.',
    deliveryAddress: '15201 N IH 35, Austin, TX 78728'
  },
  {
    id: 'REQ-005',
    clientName: 'Homeowner - Sarah Johnson',
    email: 'sarah.johnson@email.com',
    phone: '(512) 555-0123',
    requestDate: '2024-06-21',
    status: 'pending',
    priority: 'low',
    projectType: 'Residential Yard',
    requestedTrees: [
      { treeId: '1', commonName: 'Anacua', quantity: 2, unitPrice: 14 },
      { treeId: '7', commonName: 'Cherry, Escarpment (R)', quantity: 1, unitPrice: 20 }
    ],
    totalValue: 48,
    notes: 'First-time customer. Interested in native species for backyard.',
    deliveryAddress: '2505 Exposition Blvd, Austin, TX 78703'
  }
];

/**
 * Server-side function to export inventory data in CSV format
 * Called from client-side JavaScript
 */
function exportInventoryData(filteredTreeIds) {
  try {
    // If no specific trees provided, export all
    let treesToExport = TREE_DATA;
    
    // If filtered tree IDs provided, filter the data
    if (filteredTreeIds && filteredTreeIds.length > 0) {
      treesToExport = TREE_DATA.filter(tree => filteredTreeIds.includes(tree.id));
    }
    
    // Define CSV headers
    const headers = [
      'SKU',
      'Common Name', 
      'Botanical Name',
      'Category',
      'Size',
      'Price ($)',
      'Quantity in Stock',
      'Stock Status',
      'Stock Value ($)',
      'Description',
      'Planting Care Info',
      'iNaturalist URL'
    ];
    
    // Convert tree data to CSV rows
    const csvRows = treesToExport.map(tree => {
      const stockStatus = tree.quantityInStock === 0 ? 'Out of Stock' :
                         tree.quantityInStock <= 5 ? 'Low Stock' : 'In Stock';
      const stockValue = tree.price * tree.quantityInStock;
      
      return [
        tree.sku,
        tree.commonName,
        tree.botanicalName,
        tree.category,
        tree.size,
        tree.price,
        tree.quantityInStock,
        stockStatus,
        stockValue.toFixed(2),
        tree.description.replace(/"/g, '""'), // Escape quotes
        tree.plantingCareInfo.replace(/"/g, '""'), // Escape quotes
        tree.iNaturalistUrl
      ];
    });
    
    // Calculate summary statistics
    const totalTrees = treesToExport.length;
    const totalValue = treesToExport.reduce((sum, tree) => sum + (tree.price * tree.quantityInStock), 0);
    const inStockCount = treesToExport.filter(tree => tree.quantityInStock > 0).length;
    const outOfStockCount = treesToExport.filter(tree => tree.quantityInStock === 0).length;
    
    return {
      success: true,
      data: {
        headers: headers,
        rows: csvRows,
        metadata: {
          exportDate: new Date().toISOString(),
          totalTrees: totalTrees,
          totalValue: totalValue.toFixed(2),
          inStockCount: inStockCount,
          outOfStockCount: outOfStockCount,
          categories: [...new Set(treesToExport.map(tree => tree.category))]
        }
      }
    };
  } catch (error) {
    console.error('Error exporting inventory data:', error);
    return {
      success: false,
      error: error.toString()
    };
  }
}

/**
 * Server-side function to export client request data in CSV format
 * Called from client-side JavaScript
 */
function exportClientRequests(statusFilter) {
  try {
    // Filter requests by status if provided
    let requestsToExport = SAMPLE_CLIENT_REQUESTS;
    if (statusFilter && statusFilter !== 'all') {
      requestsToExport = SAMPLE_CLIENT_REQUESTS.filter(request => request.status === statusFilter);
    }
    
    // Define CSV headers for client requests
    const headers = [
      'Request ID',
      'Client Name',
      'Email',
      'Phone',
      'Request Date',
      'Status',
      'Priority',
      'Project Type',
      'Total Value ($)',
      'Tree Count',
      'Tree Details',
      'Notes',
      'Delivery Address'
    ];
    
    // Convert request data to CSV rows
    const csvRows = requestsToExport.map(request => {
      const treeCount = request.requestedTrees.reduce((sum, tree) => sum + tree.quantity, 0);
      const treeDetails = request.requestedTrees.map(tree => 
        `${tree.quantity}x ${tree.commonName} ($${tree.unitPrice})`
      ).join('; ');
      
      return [
        request.id,
        request.clientName,
        request.email,
        request.phone,
        request.requestDate,
        request.status.charAt(0).toUpperCase() + request.status.slice(1),
        request.priority.charAt(0).toUpperCase() + request.priority.slice(1),
        request.projectType,
        request.totalValue.toFixed(2),
        treeCount,
        treeDetails.replace(/"/g, '""'), // Escape quotes
        request.notes.replace(/"/g, '""'), // Escape quotes
        request.deliveryAddress
      ];
    });
    
    // Calculate summary statistics
    const totalRequests = requestsToExport.length;
    const totalValue = requestsToExport.reduce((sum, request) => sum + request.totalValue, 0);
    const statusCounts = requestsToExport.reduce((counts, request) => {
      counts[request.status] = (counts[request.status] || 0) + 1;
      return counts;
    }, {});
    
    return {
      success: true,
      data: {
        headers: headers,
        rows: csvRows,
        metadata: {
          exportDate: new Date().toISOString(),
          totalRequests: totalRequests,
          totalValue: totalValue.toFixed(2),
          statusCounts: statusCounts,
          averageRequestValue: totalRequests > 0 ? (totalValue / totalRequests).toFixed(2) : '0.00'
        }
      }
    };
  } catch (error) {
    console.error('Error exporting client requests:', error);
    return {
      success: false,
      error: error.toString()
    };
  }
}

/**
 * Server-side function to get client request summary data
 * Called from client-side JavaScript
 */
function getClientRequestSummary() {
  try {
    const statusCounts = SAMPLE_CLIENT_REQUESTS.reduce((counts, request) => {
      counts[request.status] = (counts[request.status] || 0) + 1;
      return counts;
    }, {});
    
    const totalValue = SAMPLE_CLIENT_REQUESTS.reduce((sum, request) => sum + request.totalValue, 0);
    
    return {
      success: true,
      data: {
        totalRequests: SAMPLE_CLIENT_REQUESTS.length,
        statusCounts: statusCounts,
        totalValue: totalValue.toFixed(2),
        averageValue: SAMPLE_CLIENT_REQUESTS.length > 0 ? (totalValue / SAMPLE_CLIENT_REQUESTS.length).toFixed(2) : '0.00',
        recentRequests: SAMPLE_CLIENT_REQUESTS
          .sort((a, b) => new Date(b.requestDate) - new Date(a.requestDate))
          .slice(0, 5)
      }
    };
  } catch (error) {
    console.error('Error getting client request summary:', error);
    return {
      success: false,
      error: error.toString()
    };
  }
}