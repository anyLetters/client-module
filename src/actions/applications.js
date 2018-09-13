import { ApplicationAPI } from '../api/index';

export const FETCH_APPLICATIONS_BEGIN = 'FETCH_APPLICATIONS_BEGIN';
export const FETCH_APPLICATIONS_SUCCESS = 'FETCH_APPLICATIONS_SUCCESS';
export const FETCH_APPLICATIONS_FAILURE = 'FETCH_APPLICATIONS_FAILURE';
export const RESET_APPLICATIONS_STATE = 'RESET_APPLICATIONS_STATE';
export const LOAD_WORKER_TO_APPLICATION = 'LOAD_WORKER_TO_APPLICATION';
export const LOAD_PERSONS_TO_APPLICATION = 'LOAD_PERSONS_TO_APPLICATION';
export const LOAD_FACILITIES_TO_APPLICATION = 'LOAD_FACILITIES_TO_APPLICATION';

export const fetchApplicationsBegin = () => ({
    type: FETCH_APPLICATIONS_BEGIN
});

export const fetchApplicationsSuccess = applications => ({
    type: FETCH_APPLICATIONS_SUCCESS,
    payload: { applications }
});

export const fetchApplicationsFailure = error => ({
    type: FETCH_APPLICATIONS_FAILURE,
    payload: { error }
});

export const resetApplicationsState = () => ({
    type: RESET_APPLICATIONS_STATE
});

export const loadWorkerToApplication = (id, worker, post) => ({
    type: LOAD_WORKER_TO_APPLICATION,
    payload: { id, worker, post }
});

export const loadPersonsToApplication = (id, persons) => ({
    type: LOAD_PERSONS_TO_APPLICATION,
    payload: { id, persons }
});

export const loadFacilitiesToApplication = (id, facilities) => ({
    type: LOAD_FACILITIES_TO_APPLICATION,
    payload: { id, facilities }
});

const test = [
  {
    "id": "5b94d9ad86ea9f0001025f41",
    "number": 36,
    "status": {
      "name": "Отказ",
      "abbreviation": "Отказ",
      "responsibility": "MANAGER",
      "transitions": []
    },
    "channel": "Посмотрел на сайте номер телефона",
    "workers": {
      "manager": "5b944194f2120f0001099d40",
      "lawyer": null,
      "supervisor": null
    },
    "region": "",
    "createdAt": "2018-09-09T08:28:29.699Z",
    "purpose": "Перекредитование",
    "yandexClientId": null,
    "comments": [
      {
        "text": "отказ!",
        "date": "2018-09-09T08:32:15.976Z",
        "author": "Степан Кулигин",
        "workerId": "5b7a61c77edc5500015efd18"
      }
    ],
    "persons": [
      {
        "id": "5b7a6305fa36bc0001d0c8d8",
        "roles": [
          "Заявитель"
        ]
      }
    ],
    "facilities": [],
    "entrepreneurs": [],
    "organizations": [],
    "calculations": [
      {
        "loan": 1000000,
        "period": 12,
        "percent": 3,
        "type": "A",
        "payment": 100462
      }
    ]
  },
  {
    "id": "5b9227521e34660001c25359",
    "number": 26,
    "status": {
      "name": "Обработка",
      "abbreviation": "Обработка",
      "responsibility": "MANAGER",
      "transitions": [
        {
          "id": "8ac2c4f0-b94c-462e-bb36-0bbba0fa289c",
          "name": "Далее",
          "access": [
            "MANAGER",
            "SUPERVISOR"
          ],
          "comment": false
        },
        {
          "id": "8018343c-b066-4293-82c0-e7415f9a27ae",
          "name": "На согласование",
          "access": [
            "MANAGER",
            "SUPERVISOR"
          ],
          "comment": false
        },
        {
          "id": "bb567fba-e9ef-4fcb-98c3-269c252f493b",
          "name": "Отказать",
          "access": [
            "MANAGER",
            "SUPERVISOR"
          ],
          "comment": true
        }
      ]
    },
    "channel": "Обращение по обзвону",
    "workers": {
      "manager": "5b7a61447edc5500015efd17",
      "lawyer": null,
      "supervisor": null
    },
    "region": "",
    "createdAt": "2018-09-07T07:22:58.686Z",
    "purpose": "Покупка недвижимости",
    "yandexClientId": null,
    "comments": [],
    "persons": [
      {
        "id": "5b922752d164630001f2eeed",
        "roles": [
          "Заявитель"
        ]
      },
      {
        "id": "5b95f8cc54a97800013cf8da",
        "roles": [
          "Поручитель"
        ]
      }
    ],
    "facilities": [
      "5b963b9866ba1b000142ead5"
    ],
    "entrepreneurs": [
      {
        "id": "5b9227666d1647000135a7c8",
        "roles": [
          "Заёмщик"
        ]
      }
    ],
    "organizations": [
      {
        "id": "5b964f799549140001443162",
        "roles": [
          "Поручитель",
          "Заёмщик"
        ]
      }
    ],
    "calculations": [
      {
        "loan": 1000000,
        "period": 12,
        "percent": 2.5,
        "type": "%",
        "payment": 25000
      }
    ]
  },
  {
    "id": "5b91feda1e34660001c25358",
    "number": 25,
    "status": {
      "name": "Первичное согласование",
      "abbreviation": "Согласование",
      "responsibility": "SUPERVISOR",
      "transitions": [
        {
          "id": "580f1a9d-5b26-4e77-8fd2-df299c63130d",
          "name": "Далее",
          "access": [
            "SUPERVISOR"
          ],
          "comment": false
        },
        {
          "id": "4b9073d3-18b6-435b-ad7e-6384936b6abd",
          "name": "На доработку",
          "access": [
            "SUPERVISOR"
          ],
          "comment": true
        },
        {
          "id": "d64b7530-6b5b-463e-bd7e-574b102de3e1",
          "name": "Отказать",
          "access": [
            "SUPERVISOR"
          ],
          "comment": true
        }
      ]
    },
    "channel": "Посмотрел на сайте номер телефона",
    "workers": {
      "manager": "5b8b0eae301cd80001cf9057",
      "lawyer": null,
      "supervisor": null
    },
    "region": "",
    "createdAt": "2018-09-07T04:30:18.793Z",
    "purpose": "Потребительские нужды",
    "yandexClientId": null,
    "comments": [],
    "persons": [
      {
        "id": "5b91fedad164630001f2eeeb",
        "roles": [
          "Заявитель"
        ]
      },
      {
        "id": "5b91fef2d164630001f2eeec",
        "roles": [
          "Поручитель"
        ]
      }
    ],
    "facilities": [
      "5b96164e66ba1b000142ead4"
    ],
    "entrepreneurs": [],
    "organizations": [
      {
        "id": "5b91fef2d40b0400013652d9",
        "roles": [
          "Заёмщик"
        ]
      }
    ],
    "calculations": [
      {
        "loan": 1000000,
        "period": 12,
        "percent": 3,
        "type": "A",
        "payment": 100462
      }
    ]
  },
  {
    "id": "5b913a3c121a620001c78a2d",
    "number": 24,
    "status": {
      "name": "Первичное согласование",
      "abbreviation": "Согласование",
      "responsibility": "SUPERVISOR",
      "transitions": [
        {
          "id": "580f1a9d-5b26-4e77-8fd2-df299c63130d",
          "name": "Далее",
          "access": [
            "SUPERVISOR"
          ],
          "comment": false
        },
        {
          "id": "4b9073d3-18b6-435b-ad7e-6384936b6abd",
          "name": "На доработку",
          "access": [
            "SUPERVISOR"
          ],
          "comment": true
        },
        {
          "id": "d64b7530-6b5b-463e-bd7e-574b102de3e1",
          "name": "Отказать",
          "access": [
            "SUPERVISOR"
          ],
          "comment": true
        }
      ]
    },
    "channel": "Повторное обращение",
    "workers": {
      "manager": "5b7a61c77edc5500015efd18",
      "lawyer": null,
      "supervisor": "5b890cec301cd80001cf9054"
    },
    "region": "",
    "createdAt": "2018-09-06T14:31:24.679Z",
    "purpose": "Покупка недвижимости",
    "yandexClientId": null,
    "comments": [
      {
        "text": "Все проходит круто, надо выдавать займ",
        "date": "2018-09-06T14:37:49.727Z",
        "author": "Степан Кулигин",
        "workerId": "5b7a61c77edc5500015efd18"
      }
    ],
    "persons": [
      {
        "id": "5b913a3cd164630001f2eee9",
        "roles": [
          "Заявитель",
          "Заёмщик",
          "Залогодатель"
        ]
      }
    ],
    "facilities": [
      "5b913a58effa64000153c397",
      "5b91acdfeffa64000153c398"
    ],
    "entrepreneurs": [],
    "organizations": [
      {
        "id": "5b7f07ca80e23200010904f1",
        "roles": [
          "Займодавец"
        ]
      }
    ],
    "calculations": [
      {
        "loan": 2450000,
        "period": 6,
        "percent": 2.7,
        "type": "A",
        "payment": 447777
      }
    ]
  },
  {
    "id": "5b90e57006005e0001b52615",
    "number": 23,
    "status": {
      "name": "Обработка",
      "abbreviation": "Обработка",
      "responsibility": "MANAGER",
      "transitions": [
        {
          "id": "8ac2c4f0-b94c-462e-bb36-0bbba0fa289c",
          "name": "Далее",
          "access": [
            "MANAGER",
            "SUPERVISOR"
          ],
          "comment": false
        },
        {
          "id": "8018343c-b066-4293-82c0-e7415f9a27ae",
          "name": "На согласование",
          "access": [
            "MANAGER",
            "SUPERVISOR"
          ],
          "comment": false
        },
        {
          "id": "bb567fba-e9ef-4fcb-98c3-269c252f493b",
          "name": "Отказать",
          "access": [
            "MANAGER",
            "SUPERVISOR"
          ],
          "comment": true
        }
      ]
    },
    "channel": "Посмотрел на сайте номер телефона",
    "workers": {
      "manager": "5b7a61c77edc5500015efd18",
      "lawyer": null,
      "supervisor": null
    },
    "region": "",
    "createdAt": "2018-09-06T08:29:36.893Z",
    "purpose": "Перекредитование",
    "yandexClientId": null,
    "comments": [],
    "persons": [
      {
        "id": "5b85b3c8108d1800012b247e",
        "roles": [
          "Заявитель"
        ]
      },
      {
        "id": "5b913a3cd164630001f2eee9",
        "roles": [
          "Заёмщик",
          "Залогодатель"
        ]
      }
    ],
    "facilities": [],
    "entrepreneurs": [],
    "organizations": [],
    "calculations": [
      {
        "loan": 1000000,
        "period": 12,
        "percent": 3,
        "type": "A",
        "payment": 100462
      },
      {
        "loan": 2500000,
        "period": 12,
        "percent": 2.4,
        "type": "A",
        "payment": 242245
      }
    ]
  },
  {
    "id": "5b902843c37148000166bdbd",
    "number": 22,
    "status": {
      "name": "Первичное согласование",
      "abbreviation": "Согласование",
      "responsibility": "SUPERVISOR",
      "transitions": [
        {
          "id": "580f1a9d-5b26-4e77-8fd2-df299c63130d",
          "name": "Далее",
          "access": [
            "SUPERVISOR"
          ],
          "comment": false
        },
        {
          "id": "4b9073d3-18b6-435b-ad7e-6384936b6abd",
          "name": "На доработку",
          "access": [
            "SUPERVISOR"
          ],
          "comment": true
        },
        {
          "id": "d64b7530-6b5b-463e-bd7e-574b102de3e1",
          "name": "Отказать",
          "access": [
            "SUPERVISOR"
          ],
          "comment": true
        }
      ]
    },
    "channel": "Звонки по холодной базе",
    "workers": {
      "manager": "5b8b0eae301cd80001cf9057",
      "lawyer": null,
      "supervisor": "5b881952301cd80001cf9053"
    },
    "region": "",
    "createdAt": "2018-09-05T19:02:27.125Z",
    "purpose": "Пополнение оборотных средств",
    "yandexClientId": null,
    "comments": [
      {
        "text": "Тестовый комментарий \nВ несколько строк",
        "date": "2018-09-05T19:20:34.82Z",
        "author": "Степан Кулигин",
        "workerId": "5b7a61c77edc5500015efd18"
      }
    ],
    "persons": [
      {
        "id": "5b7f958766181f00013c5385",
        "roles": [
          "Заявитель",
          "Заёмщик"
        ]
      },
      {
        "id": "5b902b7ed164630001f2eee6",
        "roles": [
          "Поручитель"
        ]
      }
    ],
    "facilities": [
      "5b902983effa64000153c387",
      "5b90e1a4effa64000153c393",
      "5b90e224effa64000153c394",
      "5b90e309effa64000153c395",
      "5b90e951effa64000153c396"
    ],
    "entrepreneurs": [
      {
        "id": "5b902b316d1647000135a7c6",
        "roles": [
          "Залогодатель"
        ]
      }
    ],
    "organizations": [],
    "calculations": [
      {
        "loan": 1500000,
        "period": 6,
        "percent": 3.2,
        "type": "A",
        "payment": 278735
      }
    ]
  },
  {
    "id": "5b8ebeb0c37148000166bdbc",
    "number": 21,
    "status": {
      "name": "Новая",
      "abbreviation": "Новая",
      "responsibility": "MANAGER",
      "transitions": [
        {
          "id": "7bc03f4b-5791-4b4a-8254-3c6f20050b71",
          "name": "Далее",
          "access": [
            "MANAGER",
            "SUPERVISOR"
          ],
          "comment": false
        }
      ]
    },
    "channel": "Посмотрел на сайте номер телефона",
    "workers": {
      "manager": "5b7a61c77edc5500015efd18",
      "lawyer": null,
      "supervisor": null
    },
    "region": "",
    "createdAt": "2018-09-04T17:19:44.75Z",
    "purpose": "Перекредитование",
    "yandexClientId": null,
    "comments": [],
    "persons": [
      {
        "id": "5b7a6305fa36bc0001d0c8d8",
        "roles": [
          "Заявитель"
        ]
      },
      {
        "id": "5b85ceb5af82f900013affa0",
        "roles": [
          "Поручитель"
        ]
      }
    ],
    "facilities": [
      "5b8ebec4effa64000153c381"
    ],
    "entrepreneurs": [],
    "organizations": [
      {
        "id": "5b8ebee3d40b0400013652d6",
        "roles": [
          "Залогодатель"
        ]
      },
      {
        "id": "5b902b7ed40b0400013652d7",
        "roles": [
          "Поручитель"
        ]
      }
    ],
    "calculations": [
      {
        "loan": 1000000,
        "period": 12,
        "percent": 3,
        "type": "A",
        "payment": 100462
      }
    ]
  },
  {
    "id": "5b8eae1ce5a7a90001bf1bd5",
    "number": 20,
    "status": {
      "name": "Новая",
      "abbreviation": "Новая",
      "responsibility": "MANAGER",
      "transitions": [
        {
          "id": "7bc03f4b-5791-4b4a-8254-3c6f20050b71",
          "name": "Далее",
          "access": [
            "MANAGER",
            "SUPERVISOR"
          ],
          "comment": false
        }
      ]
    },
    "channel": "Повторное обращение",
    "workers": {
      "manager": "5b8b0eae301cd80001cf9057",
      "lawyer": null,
      "supervisor": null
    },
    "region": "",
    "createdAt": "2018-09-04T16:09:00.083Z",
    "purpose": "Пополнение оборотных средств",
    "yandexClientId": null,
    "comments": [],
    "persons": [
      {
        "id": "5b7d41de62c4c40001e97504",
        "roles": [
          "Заявитель"
        ]
      }
    ],
    "facilities": [],
    "entrepreneurs": [],
    "organizations": [],
    "calculations": [
      {
        "loan": 2300000,
        "period": 24,
        "percent": 2.2,
        "type": "A",
        "payment": 124376
      }
    ]
  },
  {
    "id": "5b8e14a0e5a7a90001bf1bd4",
    "number": 19,
    "status": {
      "name": "Новая",
      "abbreviation": "Новая",
      "responsibility": "MANAGER",
      "transitions": [
        {
          "id": "7bc03f4b-5791-4b4a-8254-3c6f20050b71",
          "name": "Далее",
          "access": [
            "MANAGER",
            "SUPERVISOR"
          ],
          "comment": false
        }
      ]
    },
    "channel": "Повторное обращение",
    "workers": {
      "manager": "5b7a61447edc5500015efd17",
      "lawyer": null,
      "supervisor": null
    },
    "region": "",
    "createdAt": "2018-09-04T05:14:08.537Z",
    "purpose": "Покупка недвижимости",
    "yandexClientId": null,
    "comments": [],
    "persons": [
      {
        "id": "5b8e14a0d164630001f2eee2",
        "roles": [
          "Заявитель"
        ]
      },
      {
        "id": "5b853ec09b5616000191ccef",
        "roles": [
          "Залогодатель"
        ]
      }
    ],
    "facilities": [
      "5b96156866ba1b000142ead3"
    ],
    "entrepreneurs": [
      {
        "id": "5b90ad2e6d1647000135a7c7",
        "roles": [
          "Залогодатель"
        ]
      }
    ],
    "organizations": [
      {
        "id": "5b90ac83d40b0400013652d8",
        "roles": [
          "Залогодатель"
        ]
      }
    ],
    "calculations": [
      {
        "loan": 1000000,
        "period": 12,
        "percent": 3,
        "type": "A",
        "payment": 100462
      }
    ]
  },
  {
    "id": "5b8d89705687240001d0bf61",
    "number": 16,
    "status": {
      "name": "Отказ",
      "abbreviation": "Отказ",
      "responsibility": "MANAGER",
      "transitions": []
    },
    "channel": "Посмотрел на сайте номер телефона",
    "workers": {
      "manager": "5b7a61447edc5500015efd17",
      "lawyer": null,
      "supervisor": null
    },
    "region": "",
    "createdAt": "2018-09-03T19:20:16.7Z",
    "purpose": "Перекредитование",
    "yandexClientId": null,
    "comments": [
      {
        "text": "тест",
        "date": "2018-09-03T19:20:28.661Z",
        "author": "Степан Кулигин",
        "workerId": "5b7a61c77edc5500015efd18"
      },
      {
        "text": "тест",
        "date": "2018-09-03T19:23:28.489Z",
        "author": "Степан Кулигин",
        "workerId": "5b7a61c77edc5500015efd18"
      }
    ],
    "persons": [
      {
        "id": "5b7a6305fa36bc0001d0c8d8",
        "roles": [
          "Заявитель"
        ]
      }
    ],
    "facilities": [],
    "entrepreneurs": [],
    "organizations": [],
    "calculations": [
      {
        "loan": 1000000,
        "period": 12,
        "percent": 3,
        "type": "A",
        "payment": 100462
      }
    ]
  }];

export function fetchApplications(id) {
    return dispatch => {
        dispatch(fetchApplicationsBegin());

        return ApplicationAPI.findAllByPersonId()
                .then(json => {
                    dispatch(fetchApplicationsSuccess(json))
                    return json;
                })
                .catch(error => dispatch(fetchApplicationsFailure(error)));
    };
}