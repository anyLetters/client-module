import { FETCH_LOANS_BEGIN, FETCH_LOANS_SUCCESS, FETCH_LOANS_FAILURE, RESET_LOANS_STATE } from '../actions/index';

const initialState = {
    data: [{
        "id": "5b87ceeb1671e90001dd6f88",
        "number": "217",
        "manager": "Фарленков Александр Сергеевич",
        "lawyer": "Фомин Константин Андреевич",
        "createdAt": "2015-01-26",
        "contract": null,
        "persons": [
          {
            "id": "5b852abf9b5616000191cced",
            "roles": [
              "Заёмщик"
            ]
          },
          {
            "id": "5b852abf9b5616000191ccee",
            "roles": [
              "Залогодатель"
            ]
          }
        ],
        "facilities": [
          "5b87ceee38d07b00015cd310"
        ],
        "entrepreneurs": [],
        "organizations": [
          {
            "id": "5b7f07ca80e23200010904f1",
            "roles": [
              "Займодавец"
            ]
          }
        ]
      },
      {
        "id": "5b87ceef1671e90001dd6f89",
        "number": "218",
        "manager": "Фарленков Александр Сергеевич",
        "lawyer": "Фомин Константин Андреевич",
        "createdAt": "2015-05-06",
        "contract": null,
        "persons": [
          {
            "id": "5b853ec09b5616000191ccef",
            "roles": [
              "Заёмщик",
              "Залогодатель"
            ]
          }
        ],
        "facilities": [
          "5b87cef138d07b00015cd311"
        ],
        "entrepreneurs": [],
        "organizations": [
          {
            "id": "5b7f07ca80e23200010904f1",
            "roles": [
              "Займодавец"
            ]
          }
        ]
      },
      {
        "id": "5b87cef21671e90001dd6f8a",
        "number": "235",
        "manager": "Фарленков Александр Сергеевич",
        "lawyer": "Мокрушин Владислав Олегович",
        "createdAt": "2016-04-21",
        "contract": {
          "number": "235",
          "period": 36,
          "percent": 4,
          "loan": 700000,
          "type": "Дифференцированный платеж",
          "balanceOwed": 700000,
          "accountBalance": null,
          "upcomingPayment": {
            "main": null,
            "percent": 28000,
            "penalties": null
          },
          "overduePayment": {
            "main": null,
            "percent": 532000,
            "penalties": null
          },
          "schedule": [
            {
              "date": "2016-05-21",
              "balanceOwed": 700000,
              "mainPayment": null,
              "percent": 28000,
              "totalPayment": 28000
            },
            {
              "date": "2016-06-21",
              "balanceOwed": 700000,
              "mainPayment": null,
              "percent": 28000,
              "totalPayment": 28000
            },
            {
              "date": "2016-07-21",
              "balanceOwed": 700000,
              "mainPayment": null,
              "percent": 28000,
              "totalPayment": 28000
            },
            {
              "date": "2016-08-21",
              "balanceOwed": 700000,
              "mainPayment": null,
              "percent": 28000,
              "totalPayment": 28000
            },
            {
              "date": "2016-09-21",
              "balanceOwed": 700000,
              "mainPayment": null,
              "percent": 28000,
              "totalPayment": 28000
            },
            {
              "date": "2016-10-21",
              "balanceOwed": 700000,
              "mainPayment": null,
              "percent": 28000,
              "totalPayment": 28000
            },
            {
              "date": "2016-11-21",
              "balanceOwed": 700000,
              "mainPayment": null,
              "percent": 28000,
              "totalPayment": 28000
            },
            {
              "date": "2016-12-21",
              "balanceOwed": 700000,
              "mainPayment": null,
              "percent": 28000,
              "totalPayment": 28000
            },
            {
              "date": "2017-01-21",
              "balanceOwed": 700000,
              "mainPayment": null,
              "percent": 28000,
              "totalPayment": 28000
            },
            {
              "date": "2017-02-21",
              "balanceOwed": 700000,
              "mainPayment": null,
              "percent": 28000,
              "totalPayment": 28000
            },
            {
              "date": "2017-03-21",
              "balanceOwed": 700000,
              "mainPayment": null,
              "percent": 28000,
              "totalPayment": 28000
            },
            {
              "date": "2017-04-21",
              "balanceOwed": 700000,
              "mainPayment": null,
              "percent": 28000,
              "totalPayment": 28000
            },
            {
              "date": "2017-05-21",
              "balanceOwed": 700000,
              "mainPayment": null,
              "percent": 28000,
              "totalPayment": 28000
            },
            {
              "date": "2017-06-21",
              "balanceOwed": 700000,
              "mainPayment": null,
              "percent": 28000,
              "totalPayment": 28000
            },
            {
              "date": "2017-07-21",
              "balanceOwed": 700000,
              "mainPayment": null,
              "percent": 28000,
              "totalPayment": 28000
            },
            {
              "date": "2017-08-21",
              "balanceOwed": 700000,
              "mainPayment": null,
              "percent": 28000,
              "totalPayment": 28000
            },
            {
              "date": "2017-09-21",
              "balanceOwed": 700000,
              "mainPayment": null,
              "percent": 28000,
              "totalPayment": 28000
            },
            {
              "date": "2017-10-21",
              "balanceOwed": 700000,
              "mainPayment": null,
              "percent": 28000,
              "totalPayment": 28000
            },
            {
              "date": "2017-11-21",
              "balanceOwed": 700000,
              "mainPayment": null,
              "percent": 28000,
              "totalPayment": 28000
            },
            {
              "date": "2017-12-21",
              "balanceOwed": 700000,
              "mainPayment": null,
              "percent": 28000,
              "totalPayment": 28000
            },
            {
              "date": "2018-01-21",
              "balanceOwed": 700000,
              "mainPayment": null,
              "percent": 28000,
              "totalPayment": 28000
            },
            {
              "date": "2018-02-21",
              "balanceOwed": 700000,
              "mainPayment": null,
              "percent": 28000,
              "totalPayment": 28000
            },
            {
              "date": "2018-03-21",
              "balanceOwed": 700000,
              "mainPayment": null,
              "percent": 28000,
              "totalPayment": 28000
            },
            {
              "date": "2018-04-21",
              "balanceOwed": 700000,
              "mainPayment": null,
              "percent": 28000,
              "totalPayment": 28000
            },
            {
              "date": "2018-05-21",
              "balanceOwed": 700000,
              "mainPayment": null,
              "percent": 28000,
              "totalPayment": 28000
            },
            {
              "date": "2018-06-21",
              "balanceOwed": 700000,
              "mainPayment": null,
              "percent": 28000,
              "totalPayment": 28000
            },
            {
              "date": "2018-07-21",
              "balanceOwed": 700000,
              "mainPayment": null,
              "percent": 28000,
              "totalPayment": 28000
            },
            {
              "date": "2018-08-21",
              "balanceOwed": 700000,
              "mainPayment": null,
              "percent": 28000,
              "totalPayment": 28000
            },
            {
              "date": "2018-09-21",
              "balanceOwed": 700000,
              "mainPayment": null,
              "percent": 28000,
              "totalPayment": 28000
            },
            {
              "date": "2018-10-21",
              "balanceOwed": 700000,
              "mainPayment": null,
              "percent": 28000,
              "totalPayment": 28000
            },
            {
              "date": "2018-11-21",
              "balanceOwed": 700000,
              "mainPayment": null,
              "percent": 28000,
              "totalPayment": 28000
            },
            {
              "date": "2018-12-21",
              "balanceOwed": 700000,
              "mainPayment": null,
              "percent": 28000,
              "totalPayment": 28000
            },
            {
              "date": "2019-01-21",
              "balanceOwed": 700000,
              "mainPayment": null,
              "percent": 28000,
              "totalPayment": 28000
            },
            {
              "date": "2019-02-21",
              "balanceOwed": 700000,
              "mainPayment": null,
              "percent": 28000,
              "totalPayment": 28000
            },
            {
              "date": "2019-03-21",
              "balanceOwed": 700000,
              "mainPayment": null,
              "percent": 28000,
              "totalPayment": 28000
            },
            {
              "date": "2019-04-21",
              "balanceOwed": 700000,
              "mainPayment": 700000,
              "percent": 28000,
              "totalPayment": 728000
            }
          ],
          "motion": [
            {
              "date": "2018-01-12",
              "appointment": "Поступление на расчетный счет",
              "paymentType": "Прочие доходы  - прочие",
              "amount": 28000
            }
          ]
        },
        "persons": [
          {
            "id": "5b853ec89b5616000191ccf1",
            "roles": [
              "Заёмщик",
              "Залогодатель"
            ]
          },
          {
            "id": "5b853ec89b5616000191ccf2",
            "roles": [
              "Поручитель"
            ]
          }
        ],
        "facilities": [
          "5b87cef338d07b00015cd312",
          "5b87cef438d07b00015cd313",
          "5b87cef638d07b00015cd314",
          "5b87cef738d07b00015cd315"
        ],
        "entrepreneurs": [],
        "organizations": [
          {
            "id": "5b853ec8b96eef000119a4c8",
            "roles": [
              "Займодавец"
            ]
          }
        ]
      },
      {
        "id": "5b87cef71671e90001dd6f8b",
        "number": "236",
        "manager": "Фарленков Александр Сергеевич",
        "lawyer": "Фомин Константин Андреевич",
        "createdAt": "2016-04-25",
        "contract": null,
        "persons": [
          {
            "id": "5b84cfdb9b5616000191ccec",
            "roles": [
              "Заёмщик",
              "Залогодатель"
            ]
          }
        ],
        "facilities": [
          "5b87cef938d07b00015cd316"
        ],
        "entrepreneurs": [],
        "organizations": [
          {
            "id": "5b7f07ca80e23200010904f1",
            "roles": [
              "Займодавец"
            ]
          }
        ]
      },
      {
        "id": "5b87cefa1671e90001dd6f8c",
        "number": "237",
        "manager": "Фарленков Александр Сергеевич",
        "lawyer": "Фомин Константин Андреевич",
        "createdAt": "2016-04-28",
        "contract": null,
        "persons": [
          {
            "id": "5b8545229b5616000191ccf3",
            "roles": [
              "Заёмщик",
              "Залогодатель"
            ]
          },
          {
            "id": "5b8545229b5616000191ccf4",
            "roles": [
              "Залогодатель",
              "Поручитель"
            ]
          }
        ],
        "facilities": [
          "5b87cefc38d07b00015cd317"
        ],
        "entrepreneurs": [],
        "organizations": [
          {
            "id": "5b7f07ca80e23200010904f1",
            "roles": [
              "Займодавец"
            ]
          }
        ]
      },
      {
        "id": "5b87cefc1671e90001dd6f8d",
        "number": "241",
        "manager": "Фарленков Александр Сергеевич",
        "lawyer": "Мокрушин Владислав Олегович",
        "createdAt": "2016-05-30",
        "contract": {
          "number": "241",
          "period": 36,
          "percent": 4,
          "loan": 700000,
          "type": "Дифференцированный платеж",
          "balanceOwed": 700000,
          "accountBalance": null,
          "upcomingPayment": {
            "main": null,
            "percent": 28000,
            "penalties": null
          },
          "overduePayment": {
            "main": null,
            "percent": 587819.35,
            "penalties": null
          },
          "schedule": [
            {
              "date": "2016-06-30",
              "balanceOwed": 700000,
              "mainPayment": null,
              "percent": 28000,
              "totalPayment": 28000
            },
            {
              "date": "2016-07-30",
              "balanceOwed": 700000,
              "mainPayment": null,
              "percent": 28000,
              "totalPayment": 28000
            },
            {
              "date": "2016-08-30",
              "balanceOwed": 700000,
              "mainPayment": null,
              "percent": 28000,
              "totalPayment": 28000
            },
            {
              "date": "2016-09-30",
              "balanceOwed": 700000,
              "mainPayment": null,
              "percent": 28000,
              "totalPayment": 28000
            },
            {
              "date": "2016-10-30",
              "balanceOwed": 700000,
              "mainPayment": null,
              "percent": 28000,
              "totalPayment": 28000
            },
            {
              "date": "2016-11-30",
              "balanceOwed": 700000,
              "mainPayment": null,
              "percent": 28000,
              "totalPayment": 28000
            },
            {
              "date": "2016-12-30",
              "balanceOwed": 700000,
              "mainPayment": null,
              "percent": 28000,
              "totalPayment": 28000
            },
            {
              "date": "2017-01-30",
              "balanceOwed": 700000,
              "mainPayment": null,
              "percent": 28000,
              "totalPayment": 28000
            },
            {
              "date": "2017-02-28",
              "balanceOwed": 700000,
              "mainPayment": null,
              "percent": 28000,
              "totalPayment": 28000
            },
            {
              "date": "2017-03-30",
              "balanceOwed": 700000,
              "mainPayment": null,
              "percent": 28000,
              "totalPayment": 28000
            },
            {
              "date": "2017-04-30",
              "balanceOwed": 700000,
              "mainPayment": null,
              "percent": 28000,
              "totalPayment": 28000
            },
            {
              "date": "2017-05-30",
              "balanceOwed": 700000,
              "mainPayment": null,
              "percent": 28000,
              "totalPayment": 28000
            },
            {
              "date": "2017-06-30",
              "balanceOwed": 700000,
              "mainPayment": null,
              "percent": 28000,
              "totalPayment": 28000
            },
            {
              "date": "2017-07-30",
              "balanceOwed": 700000,
              "mainPayment": null,
              "percent": 28000,
              "totalPayment": 28000
            },
            {
              "date": "2017-08-30",
              "balanceOwed": 700000,
              "mainPayment": null,
              "percent": 28000,
              "totalPayment": 28000
            },
            {
              "date": "2017-09-30",
              "balanceOwed": 700000,
              "mainPayment": null,
              "percent": 28000,
              "totalPayment": 28000
            },
            {
              "date": "2017-10-30",
              "balanceOwed": 700000,
              "mainPayment": null,
              "percent": 28000,
              "totalPayment": 28000
            },
            {
              "date": "2017-11-30",
              "balanceOwed": 700000,
              "mainPayment": null,
              "percent": 28000,
              "totalPayment": 28000
            },
            {
              "date": "2017-12-30",
              "balanceOwed": 700000,
              "mainPayment": null,
              "percent": 28000,
              "totalPayment": 28000
            },
            {
              "date": "2018-01-30",
              "balanceOwed": 700000,
              "mainPayment": null,
              "percent": 28000,
              "totalPayment": 28000
            },
            {
              "date": "2018-02-28",
              "balanceOwed": 700000,
              "mainPayment": null,
              "percent": 28000,
              "totalPayment": 28000
            },
            {
              "date": "2018-03-30",
              "balanceOwed": 700000,
              "mainPayment": null,
              "percent": 28000,
              "totalPayment": 28000
            },
            {
              "date": "2018-04-30",
              "balanceOwed": 700000,
              "mainPayment": null,
              "percent": 28000,
              "totalPayment": 28000
            },
            {
              "date": "2018-05-30",
              "balanceOwed": 700000,
              "mainPayment": null,
              "percent": 28000,
              "totalPayment": 28000
            },
            {
              "date": "2018-06-30",
              "balanceOwed": 700000,
              "mainPayment": null,
              "percent": 28000,
              "totalPayment": 28000
            },
            {
              "date": "2018-07-30",
              "balanceOwed": 700000,
              "mainPayment": null,
              "percent": 28000,
              "totalPayment": 28000
            },
            {
              "date": "2018-08-30",
              "balanceOwed": 700000,
              "mainPayment": null,
              "percent": 28000,
              "totalPayment": 28000
            },
            {
              "date": "2018-09-30",
              "balanceOwed": 700000,
              "mainPayment": null,
              "percent": 28000,
              "totalPayment": 28000
            },
            {
              "date": "2018-10-30",
              "balanceOwed": 700000,
              "mainPayment": null,
              "percent": 28000,
              "totalPayment": 28000
            },
            {
              "date": "2018-11-30",
              "balanceOwed": 700000,
              "mainPayment": null,
              "percent": 28000,
              "totalPayment": 28000
            },
            {
              "date": "2018-12-30",
              "balanceOwed": 700000,
              "mainPayment": null,
              "percent": 28000,
              "totalPayment": 28000
            },
            {
              "date": "2019-01-30",
              "balanceOwed": 700000,
              "mainPayment": null,
              "percent": 28000,
              "totalPayment": 28000
            },
            {
              "date": "2019-02-28",
              "balanceOwed": 700000,
              "mainPayment": null,
              "percent": 28000,
              "totalPayment": 28000
            },
            {
              "date": "2019-03-30",
              "balanceOwed": 700000,
              "mainPayment": null,
              "percent": 28000,
              "totalPayment": 28000
            },
            {
              "date": "2019-04-30",
              "balanceOwed": 700000,
              "mainPayment": null,
              "percent": 28000,
              "totalPayment": 28000
            },
            {
              "date": "2019-05-30",
              "balanceOwed": 700000,
              "mainPayment": 700000,
              "percent": 28000,
              "totalPayment": 728000
            }
          ],
          "motion": [
            {
              "date": "2018-01-12",
              "appointment": "Поступление на расчетный счет",
              "paymentType": "Прочие доходы  - прочие",
              "amount": 28000
            }
          ]
        },
        "persons": [
          {
            "id": "5b853ec89b5616000191ccf1",
            "roles": [
              "Заёмщик",
              "Залогодатель"
            ]
          },
          {
            "id": "5b853ec89b5616000191ccf2",
            "roles": [
              "Поручитель"
            ]
          }
        ],
        "facilities": [
          "5b87cefd38d07b00015cd318",
          "5b87ceff38d07b00015cd319"
        ],
        "entrepreneurs": [],
        "organizations": [
          {
            "id": "5b853ec8b96eef000119a4c8",
            "roles": [
              "Займодавец"
            ]
          }
        ]
      },
      {
        "id": "5b87ceff1671e90001dd6f8e",
        "number": "242",
        "manager": "Фарленков Александр Сергеевич",
        "lawyer": "Мокрушин Владислав Олегович",
        "createdAt": "2016-06-06",
        "contract": {
          "number": "242",
          "period": 12,
          "percent": 4,
          "loan": 900000,
          "type": "Дифференцированный платеж",
          "balanceOwed": 900000,
          "accountBalance": null,
          "upcomingPayment": {
            "main": 900000,
            "percent": 36000,
            "penalties": null
          },
          "overduePayment": {
            "main": 900000,
            "percent": 406838.71,
            "penalties": null
          },
          "schedule": [
            {
              "date": "2016-07-06",
              "balanceOwed": 900000,
              "mainPayment": null,
              "percent": 17020,
              "totalPayment": 17020
            },
            {
              "date": "2016-08-06",
              "balanceOwed": 900000,
              "mainPayment": null,
              "percent": 36000,
              "totalPayment": 36000
            },
            {
              "date": "2016-09-06",
              "balanceOwed": 900000,
              "mainPayment": null,
              "percent": 36000,
              "totalPayment": 36000
            },
            {
              "date": "2016-10-06",
              "balanceOwed": 900000,
              "mainPayment": null,
              "percent": 36000,
              "totalPayment": 36000
            },
            {
              "date": "2016-11-06",
              "balanceOwed": 900000,
              "mainPayment": null,
              "percent": 36000,
              "totalPayment": 36000
            },
            {
              "date": "2016-12-06",
              "balanceOwed": 900000,
              "mainPayment": null,
              "percent": 36000,
              "totalPayment": 36000
            },
            {
              "date": "2017-01-06",
              "balanceOwed": 900000,
              "mainPayment": null,
              "percent": 36000,
              "totalPayment": 36000
            },
            {
              "date": "2017-02-06",
              "balanceOwed": 900000,
              "mainPayment": null,
              "percent": 36000,
              "totalPayment": 36000
            },
            {
              "date": "2017-03-06",
              "balanceOwed": 900000,
              "mainPayment": null,
              "percent": 36000,
              "totalPayment": 36000
            },
            {
              "date": "2017-04-06",
              "balanceOwed": 900000,
              "mainPayment": null,
              "percent": 36000,
              "totalPayment": 36000
            },
            {
              "date": "2017-05-06",
              "balanceOwed": 900000,
              "mainPayment": null,
              "percent": 36000,
              "totalPayment": 36000
            },
            {
              "date": "2017-06-06",
              "balanceOwed": 900000,
              "mainPayment": 900000,
              "percent": 36000,
              "totalPayment": 936000
            }
          ],
          "motion": []
        },
        "persons": [
          {
            "id": "5b85452a9b5616000191ccf5",
            "roles": [
              "Заёмщик",
              "Залогодатель"
            ]
          }
        ],
        "facilities": [
          "5b87ceff38d07b00015cd31a"
        ],
        "entrepreneurs": [],
        "organizations": [
          {
            "id": "5b853ec8b96eef000119a4c8",
            "roles": [
              "Займодавец"
            ]
          }
        ]
      },
      {
        "id": "5b87cf001671e90001dd6f8f",
        "number": "253",
        "manager": "Фарленков Александр Сергеевич",
        "lawyer": "Фомин Константин Андреевич",
        "createdAt": "2016-09-30",
        "contract": null,
        "persons": [
          {
            "id": "5b85452b9b5616000191ccf6",
            "roles": [
              "Заёмщик",
              "Залогодатель"
            ]
          }
        ],
        "facilities": [
          "5b87cf0138d07b00015cd31b",
          "5b87cf0238d07b00015cd31c"
        ],
        "entrepreneurs": [],
        "organizations": [
          {
            "id": "5b7f07ca80e23200010904f1",
            "roles": [
              "Займодавец"
            ]
          }
        ]
      },
      {
        "id": "5b87cf021671e90001dd6f90",
        "number": "252",
        "manager": "Фарленков Александр Сергеевич",
        "lawyer": "Мокрушин Владислав Олегович",
        "createdAt": "2016-09-30",
        "contract": {
          "number": "252",
          "period": 24,
          "percent": 4.5,
          "loan": 450000,
          "type": "Аннуитетный платеж",
          "balanceOwed": 363439.96,
          "accountBalance": 11.68,
          "upcomingPayment": {
            "main": 28428.05,
            "percent": 1336.84,
            "penalties": null
          },
          "overduePayment": {
            "main": 333732.53,
            "percent": 253454.34,
            "penalties": 26550.77
          },
          "schedule": [
            {
              "date": "2016-10-30",
              "balanceOwed": 450000,
              "mainPayment": 10794.16,
              "percent": 16605,
              "totalPayment": 27399.16
            },
            {
              "date": "2016-11-30",
              "balanceOwed": 439205.84,
              "mainPayment": 11279.9,
              "percent": 19764.26,
              "totalPayment": 31044.16
            },
            {
              "date": "2016-12-30",
              "balanceOwed": 427925.94,
              "mainPayment": 11787.49,
              "percent": 19256.67,
              "totalPayment": 31044.16
            },
            {
              "date": "2017-01-30",
              "balanceOwed": 416138.45,
              "mainPayment": 12317.93,
              "percent": 18726.23,
              "totalPayment": 31044.16
            },
            {
              "date": "2017-02-28",
              "balanceOwed": 403820.52,
              "mainPayment": 12872.24,
              "percent": 18171.92,
              "totalPayment": 31044.16
            },
            {
              "date": "2017-03-30",
              "balanceOwed": 390948.28,
              "mainPayment": 13451.49,
              "percent": 17592.67,
              "totalPayment": 31044.16
            },
            {
              "date": "2017-04-30",
              "balanceOwed": 377496.79,
              "mainPayment": 14056.8,
              "percent": 16987.36,
              "totalPayment": 31044.16
            },
            {
              "date": "2017-05-30",
              "balanceOwed": 363439.99,
              "mainPayment": 14689.36,
              "percent": 16354.8,
              "totalPayment": 31044.16
            },
            {
              "date": "2017-06-30",
              "balanceOwed": 348750.63,
              "mainPayment": 15350.38,
              "percent": 15693.78,
              "totalPayment": 31044.16
            },
            {
              "date": "2017-07-30",
              "balanceOwed": 333400.25,
              "mainPayment": 16041.15,
              "percent": 15003.01,
              "totalPayment": 31044.16
            },
            {
              "date": "2017-08-30",
              "balanceOwed": 317359.1,
              "mainPayment": 16763,
              "percent": 14281.16,
              "totalPayment": 31044.16
            },
            {
              "date": "2017-09-30",
              "balanceOwed": 300596.1,
              "mainPayment": 17517.34,
              "percent": 13526.82,
              "totalPayment": 31044.16
            },
            {
              "date": "2017-10-30",
              "balanceOwed": 283078.76,
              "mainPayment": 18305.62,
              "percent": 12738.54,
              "totalPayment": 31044.16
            },
            {
              "date": "2017-11-30",
              "balanceOwed": 264773.14,
              "mainPayment": 19129.37,
              "percent": 11914.79,
              "totalPayment": 31044.16
            },
            {
              "date": "2017-12-30",
              "balanceOwed": 245643.77,
              "mainPayment": 19990.19,
              "percent": 11053.97,
              "totalPayment": 31044.16
            },
            {
              "date": "2018-01-30",
              "balanceOwed": 225653.58,
              "mainPayment": 20889.75,
              "percent": 10154.41,
              "totalPayment": 31044.16
            },
            {
              "date": "2018-02-28",
              "balanceOwed": 204763.83,
              "mainPayment": 21829.79,
              "percent": 9214.37,
              "totalPayment": 31044.16
            },
            {
              "date": "2018-03-30",
              "balanceOwed": 182934.04,
              "mainPayment": 22812.13,
              "percent": 8232.03,
              "totalPayment": 31044.16
            },
            {
              "date": "2018-04-30",
              "balanceOwed": 160121.91,
              "mainPayment": 23838.67,
              "percent": 7205.49,
              "totalPayment": 31044.16
            },
            {
              "date": "2018-05-30",
              "balanceOwed": 136283.24,
              "mainPayment": 24911.41,
              "percent": 6132.75,
              "totalPayment": 31044.16
            },
            {
              "date": "2018-06-30",
              "balanceOwed": 111371.83,
              "mainPayment": 26032.43,
              "percent": 5011.73,
              "totalPayment": 31044.16
            },
            {
              "date": "2018-07-30",
              "balanceOwed": 85339.4,
              "mainPayment": 27203.89,
              "percent": 3840.27,
              "totalPayment": 31044.16
            },
            {
              "date": "2018-08-30",
              "balanceOwed": 58135.51,
              "mainPayment": 28428.05,
              "percent": 2616.1,
              "totalPayment": 31044.15
            },
            {
              "date": "2018-09-30",
              "balanceOwed": 29707.46,
              "mainPayment": 29707.46,
              "percent": 1336.84,
              "totalPayment": 31044.3
            }
          ],
          "motion": []
        },
        "persons": [
          {
            "id": "5b85452f9b5616000191ccf7",
            "roles": [
              "Заёмщик",
              "Залогодатель"
            ]
          },
          {
            "id": "5b85452f9b5616000191ccf8",
            "roles": [
              "Поручитель"
            ]
          }
        ],
        "facilities": [
          "5b87cf0338d07b00015cd31d"
        ],
        "entrepreneurs": [],
        "organizations": [
          {
            "id": "5b853ec8b96eef000119a4c8",
            "roles": [
              "Займодавец"
            ]
          }
        ]
      },
      {
        "id": "5b87cf041671e90001dd6f91",
        "number": "256",
        "manager": "Фарленков Александр Сергеевич",
        "lawyer": "Фомин Константин Андреевич",
        "createdAt": "2016-11-11",
        "contract": null,
        "persons": [
          {
            "id": "5b8545319b5616000191ccfa",
            "roles": [
              "Залогодатель"
            ]
          },
          {
            "id": "5b8545319b5616000191ccf9",
            "roles": [
              "Поручитель"
            ]
          }
        ],
        "facilities": [
          "5b87cf0538d07b00015cd31e"
        ],
        "entrepreneurs": [],
        "organizations": [
          {
            "id": "5b854531b96eef000119a4c9",
            "roles": [
              "Заёмщик"
            ]
          },
          {
            "id": "5b7f07ca80e23200010904f1",
            "roles": [
              "Займодавец"
            ]
          }
        ]
      },
      {
        "id": "5b87cf051671e90001dd6f92",
        "number": "257",
        "manager": "Фарленков Александр Сергеевич",
        "lawyer": "Фомин Константин Андреевич",
        "createdAt": "2016-11-23",
        "contract": null,
        "persons": [
          {
            "id": "5b8545319b5616000191ccfa",
            "roles": [
              "Залогодатель"
            ]
          },
          {
            "id": "5b8545319b5616000191ccf9",
            "roles": [
              "Поручитель"
            ]
          }
        ],
        "facilities": [
          "5b87cf0638d07b00015cd31f"
        ],
        "entrepreneurs": [],
        "organizations": [
          {
            "id": "5b854531b96eef000119a4c9",
            "roles": [
              "Заёмщик"
            ]
          },
          {
            "id": "5b7f07ca80e23200010904f1",
            "roles": [
              "Займодавец"
            ]
          }
        ]
      },
      {
        "id": "5b87cf071671e90001dd6f93",
        "number": "258",
        "manager": "Фарленков Александр Сергеевич",
        "lawyer": "Фомин Константин Андреевич",
        "createdAt": "2016-11-30",
        "contract": null,
        "persons": [
          {
            "id": "5b8545349b5616000191ccfb",
            "roles": [
              "Заёмщик",
              "Залогодатель"
            ]
          }
        ],
        "facilities": [
          "5b87cf0738d07b00015cd320",
          "5b87cf0938d07b00015cd321",
          "5b87cf0a38d07b00015cd322",
          "5b87cf0b38d07b00015cd323",
          "5b87cf0d38d07b00015cd324",
          "5b87cf0d38d07b00015cd325"
        ],
        "entrepreneurs": [],
        "organizations": [
          {
            "id": "5b7f07ca80e23200010904f1",
            "roles": [
              "Займодавец"
            ]
          }
        ]
      },
      {
        "id": "5b87cf0e1671e90001dd6f94",
        "number": "261",
        "manager": "Фарленков Александр Сергеевич",
        "lawyer": "Фомин Константин Андреевич",
        "createdAt": "2017-01-27",
        "contract": {
          "number": "261",
          "period": 24,
          "percent": 4,
          "loan": 500000,
          "type": "Дифференцированный платеж",
          "balanceOwed": 500000,
          "accountBalance": null,
          "upcomingPayment": {
            "main": null,
            "percent": 20000,
            "penalties": null
          },
          "overduePayment": {
            "main": null,
            "percent": 58000,
            "penalties": null
          },
          "schedule": [
            {
              "date": "2017-02-27",
              "balanceOwed": 500000,
              "mainPayment": null,
              "percent": 20000,
              "totalPayment": 20000
            },
            {
              "date": "2017-03-27",
              "balanceOwed": 500000,
              "mainPayment": null,
              "percent": 20000,
              "totalPayment": 20000
            },
            {
              "date": "2017-04-27",
              "balanceOwed": 500000,
              "mainPayment": null,
              "percent": 20000,
              "totalPayment": 20000
            },
            {
              "date": "2017-05-27",
              "balanceOwed": 500000,
              "mainPayment": null,
              "percent": 20000,
              "totalPayment": 20000
            },
            {
              "date": "2017-06-27",
              "balanceOwed": 500000,
              "mainPayment": null,
              "percent": 20000,
              "totalPayment": 20000
            },
            {
              "date": "2017-07-27",
              "balanceOwed": 500000,
              "mainPayment": null,
              "percent": 20000,
              "totalPayment": 20000
            },
            {
              "date": "2017-08-27",
              "balanceOwed": 500000,
              "mainPayment": null,
              "percent": 20000,
              "totalPayment": 20000
            },
            {
              "date": "2017-09-27",
              "balanceOwed": 500000,
              "mainPayment": null,
              "percent": 20000,
              "totalPayment": 20000
            },
            {
              "date": "2017-10-27",
              "balanceOwed": 500000,
              "mainPayment": null,
              "percent": 20000,
              "totalPayment": 20000
            },
            {
              "date": "2017-11-27",
              "balanceOwed": 500000,
              "mainPayment": null,
              "percent": 20000,
              "totalPayment": 20000
            },
            {
              "date": "2017-12-27",
              "balanceOwed": 500000,
              "mainPayment": null,
              "percent": 20000,
              "totalPayment": 20000
            },
            {
              "date": "2018-01-27",
              "balanceOwed": 500000,
              "mainPayment": null,
              "percent": 20000,
              "totalPayment": 20000
            },
            {
              "date": "2018-02-27",
              "balanceOwed": 500000,
              "mainPayment": null,
              "percent": 20000,
              "totalPayment": 20000
            },
            {
              "date": "2018-03-27",
              "balanceOwed": 500000,
              "mainPayment": null,
              "percent": 20000,
              "totalPayment": 20000
            },
            {
              "date": "2018-04-27",
              "balanceOwed": 500000,
              "mainPayment": null,
              "percent": 20000,
              "totalPayment": 20000
            },
            {
              "date": "2018-05-27",
              "balanceOwed": 500000,
              "mainPayment": null,
              "percent": 20000,
              "totalPayment": 20000
            },
            {
              "date": "2018-06-27",
              "balanceOwed": 500000,
              "mainPayment": null,
              "percent": 20000,
              "totalPayment": 20000
            },
            {
              "date": "2018-07-27",
              "balanceOwed": 500000,
              "mainPayment": null,
              "percent": 20000,
              "totalPayment": 20000
            },
            {
              "date": "2018-08-27",
              "balanceOwed": 500000,
              "mainPayment": null,
              "percent": 20000,
              "totalPayment": 20000
            },
            {
              "date": "2018-09-27",
              "balanceOwed": 500000,
              "mainPayment": null,
              "percent": 20000,
              "totalPayment": 20000
            },
            {
              "date": "2018-10-27",
              "balanceOwed": 500000,
              "mainPayment": null,
              "percent": 20000,
              "totalPayment": 20000
            },
            {
              "date": "2018-11-27",
              "balanceOwed": 500000,
              "mainPayment": null,
              "percent": 20000,
              "totalPayment": 20000
            },
            {
              "date": "2018-12-27",
              "balanceOwed": 500000,
              "mainPayment": null,
              "percent": 20000,
              "totalPayment": 20000
            },
            {
              "date": "2019-01-27",
              "balanceOwed": 500000,
              "mainPayment": 500000,
              "percent": 20000,
              "totalPayment": 520000
            }
          ],
          "motion": [
            {
              "date": "2018-04-23",
              "appointment": "Поступление на расчетный счет",
              "paymentType": "Прочие доходы  - прочие",
              "amount": 12000
            },
            {
              "date": "2018-04-28",
              "appointment": "Поступление на расчетный счет",
              "paymentType": "Прочие доходы  - прочие",
              "amount": 10000
            },
            {
              "date": "2018-05-22",
              "appointment": "Поступление на расчетный счет",
              "paymentType": "Прочие доходы  - прочие",
              "amount": 22000
            },
            {
              "date": "2018-06-04",
              "appointment": "Поступление на расчетный счет",
              "paymentType": "Прочие доходы  - прочие",
              "amount": 18000
            },
            {
              "date": "2018-06-28",
              "appointment": "Поступление на расчетный счет",
              "paymentType": "Прочие доходы  - прочие",
              "amount": 9000
            },
            {
              "date": "2018-07-02",
              "appointment": "Поступление на расчетный счет",
              "paymentType": "Процентный доход по микрозаймам",
              "amount": 11000
            },
            {
              "date": "2018-07-26",
              "appointment": "Поступление на расчетный счет",
              "paymentType": "Процентный доход по микрозаймам",
              "amount": 20000
            },
            {
              "date": "2018-08-21",
              "appointment": "Поступление на расчетный счет",
              "paymentType": "Процентный доход по микрозаймам",
              "amount": 6000
            },
            {
              "date": "2018-08-21",
              "appointment": "Поступление на расчетный счет",
              "paymentType": "Процентный доход по микрозаймам",
              "amount": 6000
            },
            {
              "date": "2018-08-28",
              "appointment": "Поступление на расчетный счет",
              "paymentType": "Процентный доход по микрозаймам",
              "amount": 8000
            }
          ]
        },
        "persons": [
          {
            "id": "5b8545349b5616000191ccfb",
            "roles": [
              "Заёмщик",
              "Залогодатель"
            ]
          }
        ],
        "facilities": [
          "5b87cf0f38d07b00015cd326"
        ],
        "entrepreneurs": [],
        "organizations": [
          {
            "id": "5b7f07ca80e23200010904f1",
            "roles": [
              "Займодавец"
            ]
          }
        ]
      },
      {
        "id": "5b87cf0f1671e90001dd6f95",
        "number": "263",
        "manager": "Фарленков Александр Сергеевич",
        "lawyer": "Фомин Константин Андреевич",
        "createdAt": "2017-03-07",
        "contract": {
          "number": "263",
          "period": 36,
          "percent": 4.6,
          "loan": 250000,
          "type": "Аннуитетный платеж",
          "balanceOwed": 179103.7,
          "accountBalance": 4413.21,
          "upcomingPayment": {
            "main": 5833.62,
            "percent": 8238.77,
            "penalties": null
          },
          "overduePayment": {
            "main": null,
            "percent": null,
            "penalties": null
          },
          "schedule": [
            {
              "date": "2017-04-07",
              "balanceOwed": 250000,
              "mainPayment": 2840.74,
              "percent": 11500,
              "totalPayment": 14340.74
            },
            {
              "date": "2017-05-07",
              "balanceOwed": 247159.26,
              "mainPayment": 2971.41,
              "percent": 11369.33,
              "totalPayment": 14340.74
            },
            {
              "date": "2017-06-07",
              "balanceOwed": 244187.85,
              "mainPayment": 3108.1,
              "percent": 11232.64,
              "totalPayment": 14340.74
            },
            {
              "date": "2017-07-07",
              "balanceOwed": 241079.75,
              "mainPayment": 3251.07,
              "percent": 11089.67,
              "totalPayment": 14340.74
            },
            {
              "date": "2017-08-07",
              "balanceOwed": 237828.68,
              "mainPayment": 3400.62,
              "percent": 10940.12,
              "totalPayment": 14340.74
            },
            {
              "date": "2017-09-07",
              "balanceOwed": 234428.06,
              "mainPayment": 3557.05,
              "percent": 10783.69,
              "totalPayment": 14340.74
            },
            {
              "date": "2017-10-07",
              "balanceOwed": 230871.01,
              "mainPayment": 3720.67,
              "percent": 10620.07,
              "totalPayment": 14340.74
            },
            {
              "date": "2017-11-07",
              "balanceOwed": 227150.34,
              "mainPayment": 3891.82,
              "percent": 10448.92,
              "totalPayment": 14340.74
            },
            {
              "date": "2017-12-07",
              "balanceOwed": 223258.52,
              "mainPayment": 4070.85,
              "percent": 10269.89,
              "totalPayment": 14340.74
            },
            {
              "date": "2018-01-07",
              "balanceOwed": 219187.67,
              "mainPayment": 4258.11,
              "percent": 10082.63,
              "totalPayment": 14340.74
            },
            {
              "date": "2018-02-07",
              "balanceOwed": 214929.56,
              "mainPayment": 4453.98,
              "percent": 9886.76,
              "totalPayment": 14340.74
            },
            {
              "date": "2018-03-07",
              "balanceOwed": 210475.58,
              "mainPayment": 4658.86,
              "percent": 9681.88,
              "totalPayment": 14340.74
            },
            {
              "date": "2018-04-07",
              "balanceOwed": 205816.72,
              "mainPayment": 4873.17,
              "percent": 9467.57,
              "totalPayment": 14340.74
            },
            {
              "date": "2018-05-07",
              "balanceOwed": 200943.55,
              "mainPayment": 5097.34,
              "percent": 9243.4,
              "totalPayment": 14340.74
            },
            {
              "date": "2018-06-07",
              "balanceOwed": 195846.21,
              "mainPayment": 5331.81,
              "percent": 9008.93,
              "totalPayment": 14340.74
            },
            {
              "date": "2018-07-07",
              "balanceOwed": 190514.4,
              "mainPayment": 5577.08,
              "percent": 8763.66,
              "totalPayment": 14340.74
            },
            {
              "date": "2018-08-07",
              "balanceOwed": 184937.32,
              "mainPayment": 5833.62,
              "percent": 8507.12,
              "totalPayment": 14340.74
            },
            {
              "date": "2018-09-07",
              "balanceOwed": 179103.7,
              "mainPayment": 6101.97,
              "percent": 8238.77,
              "totalPayment": 14340.74
            },
            {
              "date": "2018-10-07",
              "balanceOwed": 173001.73,
              "mainPayment": 6382.66,
              "percent": 7958.08,
              "totalPayment": 14340.74
            },
            {
              "date": "2018-11-07",
              "balanceOwed": 166619.07,
              "mainPayment": 6676.26,
              "percent": 7664.48,
              "totalPayment": 14340.74
            },
            {
              "date": "2018-12-07",
              "balanceOwed": 159942.81,
              "mainPayment": 6983.37,
              "percent": 7357.37,
              "totalPayment": 14340.74
            },
            {
              "date": "2019-01-07",
              "balanceOwed": 152959.44,
              "mainPayment": 7304.61,
              "percent": 7036.13,
              "totalPayment": 14340.74
            },
            {
              "date": "2019-02-07",
              "balanceOwed": 145654.83,
              "mainPayment": 7640.62,
              "percent": 6700.12,
              "totalPayment": 14340.74
            },
            {
              "date": "2019-03-07",
              "balanceOwed": 138014.21,
              "mainPayment": 7992.09,
              "percent": 6348.65,
              "totalPayment": 14340.74
            },
            {
              "date": "2019-04-07",
              "balanceOwed": 130022.12,
              "mainPayment": 8359.72,
              "percent": 5981.02,
              "totalPayment": 14340.74
            },
            {
              "date": "2019-05-07",
              "balanceOwed": 121662.4,
              "mainPayment": 8744.27,
              "percent": 5596.47,
              "totalPayment": 14340.74
            },
            {
              "date": "2019-06-07",
              "balanceOwed": 112918.13,
              "mainPayment": 9146.51,
              "percent": 5194.23,
              "totalPayment": 14340.74
            },
            {
              "date": "2019-07-07",
              "balanceOwed": 103771.62,
              "mainPayment": 9567.25,
              "percent": 4773.49,
              "totalPayment": 14340.74
            },
            {
              "date": "2019-08-07",
              "balanceOwed": 94204.37,
              "mainPayment": 10007.34,
              "percent": 4333.4,
              "totalPayment": 14340.74
            },
            {
              "date": "2019-09-07",
              "balanceOwed": 84197.03,
              "mainPayment": 10467.68,
              "percent": 3873.06,
              "totalPayment": 14340.74
            },
            {
              "date": "2019-10-07",
              "balanceOwed": 73729.35,
              "mainPayment": 10949.19,
              "percent": 3391.55,
              "totalPayment": 14340.74
            },
            {
              "date": "2019-11-07",
              "balanceOwed": 62780.16,
              "mainPayment": 11452.85,
              "percent": 2887.89,
              "totalPayment": 14340.74
            },
            {
              "date": "2019-12-07",
              "balanceOwed": 51327.31,
              "mainPayment": 11979.68,
              "percent": 2361.06,
              "totalPayment": 14340.74
            },
            {
              "date": "2020-01-07",
              "balanceOwed": 39347.63,
              "mainPayment": 12530.75,
              "percent": 1809.99,
              "totalPayment": 14340.74
            },
            {
              "date": "2020-02-07",
              "balanceOwed": 26816.88,
              "mainPayment": 13107.16,
              "percent": 1233.58,
              "totalPayment": 14340.74
            },
            {
              "date": "2020-03-07",
              "balanceOwed": 13709.72,
              "mainPayment": 13709.72,
              "percent": 630.65,
              "totalPayment": 14340.37
            }
          ],
          "motion": [
            {
              "date": "2018-01-22",
              "appointment": "Поступление на расчетный счет",
              "paymentType": "Прочие доходы  - прочие",
              "amount": 30000
            },
            {
              "date": "2018-02-08",
              "appointment": "Поступление на расчетный счет",
              "paymentType": "Прочие доходы  - прочие",
              "amount": 15000
            },
            {
              "date": "2018-05-24",
              "appointment": "Поступление на расчетный счет",
              "paymentType": "Прочие доходы  - прочие",
              "amount": 45000
            },
            {
              "date": "2018-08-09",
              "appointment": "Поступление на расчетный счет",
              "paymentType": "Прочие доходы  - прочие",
              "amount": 30000
            }
          ]
        },
        "persons": [
          {
            "id": "5b85b373108d1800012b246a",
            "roles": [
              "Заёмщик",
              "Залогодатель"
            ]
          }
        ],
        "facilities": [
          "5b87cf1038d07b00015cd327",
          "5b87cf1238d07b00015cd328",
          "5b87cf1338d07b00015cd329"
        ],
        "entrepreneurs": [],
        "organizations": [
          {
            "id": "5b7f07ca80e23200010904f1",
            "roles": [
              "Займодавец"
            ]
          }
        ]
      },
      {
        "id": "5b87cf141671e90001dd6f96",
        "number": "271",
        "manager": "Фарленков Александр Сергеевич",
        "lawyer": "Фомин Константин Андреевич",
        "createdAt": "2017-05-17",
        "contract": null,
        "persons": [
          {
            "id": "5b85b378108d1800012b246b",
            "roles": [
              "Заёмщик",
              "Залогодатель"
            ]
          }
        ],
        "facilities": [
          "5b87cf1738d07b00015cd32a"
        ],
        "entrepreneurs": [],
        "organizations": [
          {
            "id": "5b7f07ca80e23200010904f1",
            "roles": [
              "Займодавец"
            ]
          }
        ]
      },
      {
        "id": "5b87cf171671e90001dd6f97",
        "number": "273",
        "manager": "Фарленков Александр Сергеевич",
        "lawyer": "Фомин Константин Андреевич",
        "createdAt": "2017-05-19",
        "contract": null,
        "persons": [
          {
            "id": "5b85b37a108d1800012b246c",
            "roles": [
              "Заёмщик",
              "Залогодатель"
            ]
          }
        ],
        "facilities": [
          "5b87cf1938d07b00015cd32b"
        ],
        "entrepreneurs": [],
        "organizations": [
          {
            "id": "5b7f07ca80e23200010904f1",
            "roles": [
              "залогодержатель"
            ]
          }
        ]
      }],
    fetching: false,
    error: null
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_LOANS_BEGIN:
            return {
                ...state,
                fetching: true,
                error: null
            };

        case FETCH_LOANS_SUCCESS:
            return {
                ...state,
                fetching: false,
                data: action.payload.loans
            };

        case FETCH_LOANS_FAILURE:
            return {
                ...state,
                fetching: false,
                error: action.payload.error,
                data: []
            };

        case RESET_LOANS_STATE:
            return initialState;

        default:
            return state;
    }
}