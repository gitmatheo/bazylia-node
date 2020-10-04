const buildMonthField = require('../../utils/buildMonthField');
module.exports = mapToRozliczeniaDto = async (firmy, wizyty) => {

const finalArray = [];
firmy.forEach(firma => {


    const wizytyFiltered = [];
    wizyty.map(wizyta =>{
        if(wizyta.firmaId && wizyta.firmaId === firma.firmaId) {
            wizytyFiltered.push(wizyta)
        }
    })

    const wizytySortedByDate = wizytyFiltered.sort((a, b) => new Date(a.dataWizyty) - new Date(b.dataWizyty))



    const miesiaceStringi = [];
    const wizytyWithMiesiac = [];

    wizytySortedByDate.forEach(wizyta => {
        const miesiac = buildMonthField(wizyta.dataWizyty)
        miesiaceStringi.push(miesiac)


        wizytyWithMiesiac.push({...wizyta, miesiac: miesiac })
    } )


    const uniqueMiesiaceStringi = [...new Set(JSON.parse(JSON.stringify(miesiaceStringi)))];


    let miesiaceArray = [];

    uniqueMiesiaceStringi.forEach(uniqueMiesiac => {
        const pacjentsId = [];
        let uniqueIds = [];
        const miesiaceObject = {
            miesiac: uniqueMiesiac,
            pacjenci: []
        }

        wizytyWithMiesiac.forEach(wizyta => {
            if(wizyta.miesiac === uniqueMiesiac) {
                pacjentsId.push(wizyta.pacjent.pacjentId)
            }
        })

        uniqueIds = [...new Set(JSON.parse(JSON.stringify(pacjentsId)))];

        uniqueIds.forEach(id => {
            const pacjenty = {
                    pacjent: {},
                    wizyty: []
                }

            wizytyWithMiesiac.forEach(wizyta => {
                if(wizyta.pacjent.pacjentId === id && wizyta.miesiac === uniqueMiesiac ) {
                    pacjenty.wizyty.push(wizyta)
                    pacjenty.pacjent = wizyta.pacjent
                }
            })

            miesiaceObject.pacjenci.push(pacjenty)
        })

        miesiaceArray.push(miesiaceObject)

    })

    if(miesiaceArray.length) {
        finalArray.push({
            firma: firma,
            miesiace: miesiaceArray,
        })
    }
});
    return finalArray;
}


module.exports = mapToRozliczeniaSpecjalistyka = async (wizyty) => {
        const wizytySortedByDate = wizyty.sort((a, b) => new Date(a.dataWizyty) - new Date(b.dataWizyty));

        const pacjentsIds = [];

        wizytySortedByDate.forEach(wizyta => {
            pacjentsIds.push(wizyta.pacjent.pacjentId)
        })
        const uniquePacjents = [...new Set(JSON.parse(JSON.stringify(pacjentsIds)))];

        const miesiaceArray = [];
        uniquePacjents.forEach(uniquePacjent => {

            const pacjenci = {
                pacjent: '',
                wizyty: []
            }

            wizytySortedByDate.forEach(wizyta => {
                if(wizyta.pacjent.pacjentId === uniquePacjent) {
                    pacjenci.pacjent = wizyta.pacjent
                    pacjenci.wizyty.push(wizyta)
                }
            })

            miesiaceArray.push(pacjenci)

        })

        return miesiaceArray;
    }



