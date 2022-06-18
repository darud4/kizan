export class DemoApi {
    constructor() {
        this._base = [
            { FAM: 'Иванов', IMJ: 'Иван', OTCH: 'Иванович' },
            { FAM: 'Иванищев', IMJ: 'Петр', OTCH: 'Сергеевич' },
            { FAM: 'Ивандопуло', IMJ: 'Максим', OTCH: 'Сергеевич' },
            { FAM: 'Петров', IMJ: 'Леонид', OTCH: 'Барухович' },
            { FAM: 'Петровский', IMJ: 'Гефест', OTCH: 'Смакович' },
        ]
    }
    findPersonQuick(fam) {
        if (!fam || fam.length < 3) return Promise.resolve([]);
        return Promise.resolve(this._base.filter(baseItem => baseItem.FAM.toUpperCase().startsWith(fam.toUpperCase())));
    }

    _makeRequest(url, params) {
        return fetch(url, params)
            .then((res) =>
                res.ok
                    ? res.json()
                    : Promise.reject({ status: res.status, statusText: res.statusText })
            )
            .catch((error) => Promise.reject(error));
    }

}

