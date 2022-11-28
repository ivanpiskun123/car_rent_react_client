import {useMemo} from "react";


export const useUsers = (units, query) => {

    const resultUnits = useMemo(() => {
        let q = query.toLowerCase()
        return units.filter(unit =>
            unit.attributes.first_name.toLowerCase().includes(q)
            ||
            unit.attributes.second_name.toLowerCase().includes(q)
            ||
            unit.attributes.email.toLowerCase().includes(q)
            ||
            unit.attributes.phone.toLowerCase().includes(q)
        )
    }, [query, units])

    return resultUnits;
}
