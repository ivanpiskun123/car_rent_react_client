import {useMemo} from "react";

export const useSortedCarRents = (units, sort) => {
    const sortedUnits = useMemo(() => {
        if(sort) {
            if(!sort.localeCompare("active"))
            {
                return [...units].sort((a, b) => Number(b.attributes.ended_at === null) - Number(a.attributes.ended_at === null))
            }
            else if(!sort.localeCompare("ended"))
            {
                return [...units].sort((a, b) => Number(b.attributes.ended_at !== null && !b.attributes.is_paid) - Number(a.attributes.ended_at !== null && !a.attributes.is_paid))
            }
            else if(!sort.localeCompare("paid"))
            {
                return [...units].sort((a, b) => Number(b.attributes.is_paid) - Number(a.attributes.is_paid))
            }
            else return [...units].sort((a, b) => a.attributes.created_at.localeCompare(b.attributes.created_at)).reverse()
        }
        return units;
    }, [sort, units])

    return sortedUnits;
}


export const useRents = (units, query, sort) => {
    const sortedUnits = useSortedCarRents(units, sort);

    const resultUnits = useMemo(() => {
        let q = query.toLowerCase()
        return sortedUnits.filter(unit =>
            unit.relationships.car.meta.full_name.toLowerCase().includes(q)
            ||
            (
            unit.attributes.ended_at === null ?
                null
            :
                unit.attributes.ended_at.toLowerCase().includes(q)
            )
            ||
            unit.attributes.created_at.toLowerCase().includes(q)
        )
    }, [query, sortedUnits])

    return resultUnits;
}
