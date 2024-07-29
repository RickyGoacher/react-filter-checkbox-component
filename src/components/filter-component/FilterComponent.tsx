import { ReactElement, useState } from "react";

interface PropsInterface {
    applyButtonText: string;
    clearButtonText: string;
    filters: {
        [key: string]: Array<{
            label: string;
            param: string;
        }>
    };
    onSubmit: Function;
    selectedFilterRemoveIcon: string | ReactElement;
    selectedFilterBackgroundColour: string;
    selectedFilterTextColour: string;
}

const FilterComponent = (props:PropsInterface) => {

    const DefaultCheckedStatus = Object.entries(props.filters).map((item) => {
        return new Array(item[1].length).fill(false)
    });

    const DefaultSelectedFilters = Object.entries(props.filters).map((item) => {
        return new Array(item[1].length).fill({})
    });

    const [getCheckedStatus, setCheckedStatus] = useState(DefaultCheckedStatus);

    const [getSelectedFilters, setSelectedFilters] = useState(DefaultSelectedFilters);

    function handleCheckboxChange(pos1:number, position:number, filterLabel:string) {

        const updatedCheckedState = getCheckedStatus.map((filterArr, filterArrIndex) => {
            const nextarr = filterArr.map((filterItem, filterItemIndex) => {
                return filterItemIndex === position ? !filterItem : filterItem;
            });
            return filterArrIndex === pos1 ? nextarr : filterArr;
        });

        setCheckedStatus(updatedCheckedState);

        const updatedSelectedState = getSelectedFilters.map((filterArr, filterArrIndex) => {
            const nextarr = filterArr.map((filterItem, filterItemIndex) => {
                return (updatedCheckedState[filterArrIndex][filterItemIndex] == true) ? props.filters[filterLabel][filterItemIndex] : {};
            });
            return filterArrIndex === pos1 ? nextarr : filterArr;
        });

        setSelectedFilters(updatedSelectedState);

    }

    function onClear() {
        setCheckedStatus(DefaultCheckedStatus);
        setSelectedFilters(DefaultSelectedFilters);
    }

    const RenderFilters = Object.entries(props.filters).map((item, pos) => {

        const renderMap = item[1].map((filter, index) => {
            return (
                <li key={index + Math.random()} className="filter-item">
                    <label>
                        <input
                            type="checkbox"
                            checked={getCheckedStatus[pos][index] == true ? getCheckedStatus[pos][index] : false}
                            onChange={(e) => handleCheckboxChange(pos, index, item[0])}
                        />
                        <span>{filter.label}</span>
                    </label>
                </li>
            );
        });

        return ( 
            <div key={pos + Math.random()}>
                <span className="filter-section-label">{item[0]}</span>
                <ul className="filter-section">
                    {renderMap}
                </ul>
            </div>
        );
    });

    const RenderSelectedFilter = Object.entries(props.filters).map((type, pos) => {
        return getSelectedFilters[pos].map((selectedFilter, index) => {
            return selectedFilter.label !== undefined && <span key={selectedFilter.label + Math.random()} className="selected-filter" style={{backgroundColor: props.selectedFilterBackgroundColour, color: props.selectedFilterTextColour}}>{selectedFilter.label} <span className="close-btn" onClick={(e) => handleCheckboxChange(pos, index, type[0])}>{props.selectedFilterRemoveIcon || 'X'}</span></span>;
        });   
    }).flat();    

    return (
        <>  
            <div className="selected-filters-container">
                {RenderSelectedFilter}
            </div>
            {RenderFilters}
            <div className="filter-button-container">
                <button className="primary" onClick={() => props.onSubmit(getSelectedFilters)}>{props.applyButtonText || 'Apply Filters'}</button>
                <button className="secondary" onClick={onClear}>{props.clearButtonText || 'Clear Filters'}</button>
            </div>
        </>
    );

}

FilterComponent.defaultProps = {
    selectedFilterBackgroundColour: "blue",
    selectedFilterTextColour: "#fff"
};

export default FilterComponent;