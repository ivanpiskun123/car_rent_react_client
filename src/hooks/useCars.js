import {useMemo} from "react";

export const useSortedCars = (units, sort) => {
    const sortedUnits = useMemo(() => {
        if(sort) {
            if(!sort.localeCompare("name"))
            {
             return [...units].sort((a, b) => (a.relationships.car_brand.meta.name+a.attributes.name).localeCompare(b.relationships.car_brand.meta.name+b.attributes.name))
            }
            else if(!sort.localeCompare("year"))
            {
                return [...units].sort((a, b) => b.attributes.edition_year - a.attributes.edition_year )
            }
            else if(!sort.localeCompare("condition"))
            {
                return [...units].sort((a, b) => b.attributes.condition - a.attributes.condition )
            }
            else if(!sort.localeCompare("price"))
            {
                return [...units].sort((a, b) => a.attributes.price_per_min - b.attributes.price_per_min )
            }
            else if(!sort.localeCompare("volume"))
            {
                return [...units].sort((a, b) => a.attributes.engine_volume - b.attributes.engine_volume )
            }
            else return [...units].sort((a, b) => a.attributes.created_at.localeCompare(b.attributes.created_at)).reverse()
        }
        return units;
    }, [sort, units])

    return sortedUnits;
}


export const useCars = (units, query, sort) => {
    const sortedUnits = useSortedCars(units, sort);

    const resultUnits = useMemo(() => {
        let q = query.toLowerCase()
        return sortedUnits.filter(unit =>
            unit.relationships.car_brand.meta.name.toLowerCase().includes(q)
            ||
            unit.relationships.fuel_type.meta.name.toLowerCase().includes(q)
            ||
            unit.attributes.engine_volume.toString().toLowerCase().includes(q)
            ||
            unit.attributes.edition_year.toString().toLowerCase().includes(q)
            ||
            unit.attributes.name.toLowerCase().includes(q)
            ||
            unit.attributes.created_at.toLowerCase().includes(q)
        )
    }, [query, sortedUnits])

    return resultUnits;
}
