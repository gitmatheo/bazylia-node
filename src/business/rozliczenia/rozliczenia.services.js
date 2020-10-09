import buildMonthField from '../../utils/buildMonthField.js';

export const mapToRozliczeniaMedycynaPracyDto = async (companies, visits) => {

const finalArray = [];
companies.forEach(firma => {

    const visitsFiltered = visits.filter(wizyta => wizyta.firmaId && wizyta.firmaId == firma.firmaId);
    const visitsSortedByDate = visitsFiltered.sort((a, b) => new Date(a.dataWizyty) - new Date(b.dataWizyty))

    const monthStrings = [];

    const visitsWithMonth = visitsSortedByDate.map(wizyta => {
        const month = buildMonthField(wizyta.dataWizyty)
        monthStrings.push(month)
        return {...wizyta, miesiac: month }
    } )


    const uniqueMonthsStrings = [...new Set(JSON.parse(JSON.stringify(monthStrings)))];

    const monthsArray = [];

    uniqueMonthsStrings.forEach(uniqueMiesiac => {

        const patientsIds = visitsWithMonth
                            .filter(wizyta => wizyta.miesiac == uniqueMiesiac)
                            .map(wizyta => wizyta.pacjent.pacjentId)


        const months = {
            miesiac: uniqueMiesiac,
            pacjenci: []
        }

        const uniquePatientsIds = [...new Set(JSON.parse(JSON.stringify(patientsIds)))];

        uniquePatientsIds.forEach(uniquePacjentId => {
            const patient = {
                    pacjent: {},
                    wizyty: []
                }

            visitsWithMonth
                .filter(wizyta => wizyta.pacjent.pacjentId == uniquePacjentId && wizyta.miesiac == uniqueMiesiac)
                .forEach(wizyta => {
                    patient.pacjent = wizyta.pacjent
                    patient.wizyty.push(wizyta)
                })

            months.pacjenci.push(patient)
        })

        monthsArray.push(months)

    })

    if(monthsArray.length) {
        finalArray.push({
            firma: firma,
            miesiace: monthsArray,
        })
    }
});
    return finalArray;
};

export const mapToRozliczeniaSpecjalistyka = async (visits) => {

        const visitsSortedByDate = visits.sort((a, b) => new Date(a.dataWizyty) - new Date(b.dataWizyty));
        const patientsIds = visitsSortedByDate.map(wizyta => wizyta.pacjent.pacjentId);
        const uniquePatientsIds = [...new Set(JSON.parse(JSON.stringify(patientsIds)))];
        const monthsArray = [];

        uniquePatientsIds.forEach(uniquePacjentId => {

            const patient = {
                pacjent: '',
                wizyty: []
            }

            visitsSortedByDate
                .filter(wizyta => wizyta.pacjent.pacjentId == uniquePacjentId)
                .forEach(wizyta => {
                    patient.pacjent = wizyta.pacjent
                    patient.wizyty.push(wizyta)

                })

            monthsArray.push(patient)

        })

        return monthsArray;
    };



