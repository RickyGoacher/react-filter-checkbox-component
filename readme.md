# React Filter Component

A React component for creating checkbox filters


## How to use

### Install

Installation: npm install react-filter-checkbox-component

### Usage

Import the package into your app:

import { FilterComponent } from "react-filter-checkbox-component";

Component options:

      <FilterComponent 
        filters={Filters} 
        onSubmit={onSubmit}
        applyButtonText={'Apply Filters'}
        clearButtonText={'Clear Filters'} 
        selectedFilterRemoveIcon={'X'}
        selectedFilterBackgroundColour={'blue'}
        selectedFilterTextColour={'#fff'}
      />

    - filters={Filters}

        Filters must follow this format:

         const Filters = {
            "Meal Type":  [
                {
                    label: 'Breakfast',
                    param: '&mealType=breakfast'
                },
                {
                    label: 'Dinner',
                    param: '&mealType=Dinner'
                }
            ],  
            "Diet": [
                {
                    label: 'Balanced',
                    param: '&diet=balanced'
                },
                {
                    label: 'High Fiber',
                    param: '&diet=high-fiber'
                },
                {
                    label: 'High Protein',
                    param: '&diet=high-protein'
                }
            ]
        }

    - onSubmit={onSubmit}
        Callback function to return the selected filters on submit.

        function onSubmit(result) {
            console.log(result);
        }

    - applyButtonText={'Apply Filters'}
        Text for Apply button.
    
    - clearButtonText={'Clear Filters'} 
        Text for clear button.

    - selectedFilterRemoveIcon={'X'}
        Remove filter icon, accepts string or react component.

    - selectedFilterBackgroundColour={'blue'}
        Set background colour of selected filters.
        
    - selectedFilterTextColour={'#fff'} 
        Set text colour for selected filters.      
