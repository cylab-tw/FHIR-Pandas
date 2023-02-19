# ColsType

## 參考

TWCore：http://hitstdio.ntunhs.edu.tw/ig/twcore/CapabilityStatement-CapabilityStatementTWCoreClient.html

## 使用
透過Javascript的遞迴(Recursive) 重複判斷type是否為object

## String

instant、time、data、dateTime、base64Binary、decimal、url、uri、code、string、integer、oid、uuid、canonical、markdown、id、unsignedlnt、positvelnt

## boolean

boolean

## 其他

object、array=>需要添加 childrens  
example ：

1.  直接加在第一層裡面
    ```
    {
        label: "DispenseRequest",
        name: "dispenseRequest",
        type: "object",
        childrens: [
            {
                label: "ValidityPeriod",
                name: "validityPeriod",
                type: "object",
                childrens: [
                    { label: "Start", name: "start", type: "string" },
                    { label: "End", name: "end", type: "string" },
                ],
            },
            {
                label: "NumberOfRepeatsAllowed",
                name: "numberOfRepeatsAllowed",
                type: "string",
            },
            {
                label: "ExpectedSupplyDuration",
                name: "expectedSupplyDuration",
                type: "object",
                childrens: [
                    { label: "Value", name: "value", type: "string" },
                    { label: "Currency", name: "currency", type: "string" },
                ],
            },
        ],
    },
    ```
2.  透過 index.ts 引入

    ```
    ./index.ts

    export const Period = [
        { label: "Start", name: "start", type: "string" },
        { label: "End", name: "end", type: "string" },
    ];

    export const Duration = [
        { label: "Value", name: "value", type: "string" },
        { label: "Currency", name: "currency", type: "string" },
    ];
    ```

    ```
    ./MedicationRequestCols.ts

    import {eriod,Duration,} from "./index";
    {
        label: "DispenseRequest",
        name: "dispenseRequest",
        type: "object",
        childrens: [
            {label: "ValidityPeriod",ame: "validityPeriod",type: "object",childrens: Period,},
            {label: "NumberOfRepeatsAllowed",name: "numberOfRepeatsAllowed",type: "string",},
            {label: "ExpectedSupplyDuration",name: "expectedSupplyDuration",type: "object",childrens: Duration,},
        ],
    },
    ```
