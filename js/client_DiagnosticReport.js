var ClientApp = angular.module("ClientApp", []);
ClientApp.controller("ClientCtrl", function ($scope, $location, $window) {
  /* URI variable*/
  $scope.URL = "";
  $scope.httpMethod = "GET";
  $scope.basePath = "https://hackathon.siim.org/fhir";
  $scope.resource = "DiagnosticReport";
  $scope.ID = "";
  $scope.Token = "";
  /* Data variable */
  $scope.bodyData = "";
  $scope.ErrorInfo = "";
  $scope.resultEntry = [];
  $scope.httpResult = "";
  $scope.resResource = "";
  $scope.IdentifierData = [];
  /* Page variable */
  $scope._count = 20;
  $scope.pageNum = 0;
  $scope.selfPage = "";
  $scope.prevPage = "";
  $scope.nextPage = "";
  /* Parameter variable */
  $scope.newParameter = "";
  $scope.searchParameters = [];
  $scope.resultParameters = [];
  $scope.paraSortPrefixes = true;
  $scope.paraModifier = "";
  $scope._sort = "";
  $scope.sortDirection = true;
  /* Other variable*/
  $scope.toolsIsOpen = true;
  $scope.displayMode = '';  
  $scope.CommonSearchParametersList = [{
    Name: "_content",
    Type: "string",
    Description: "Search on the entire content of the resource"
  },
  {
    Name: "_id",
    Type: "token",
    Description: "Logical id of this artifact.[Resource.id]"
  },
  {
    Name: "_lastUpdated",
    Type: "date",
    Description: "When the resource version last changed.[Resource.meta.lastUpdated]"
  },
  {
    Name: "_profile",
    Type: "uri",
    Description: "Profiles this resource claims to conform to.[Resource.meta.profile]"
  },
  {
    Name: "_query",
    Type: "token",
    Description: "A custom search profile that describes a specific defined query operation"
  },
  {
    Name: "_security",
    Type: "token",
    Description: "Security Labels applied to this resource.[Resource.meta.security]"
  },
  {
    Name: "_source",
    Type: "uri",
    Description: "Identifies where the resource comes from.[Resource.meta.source]"
  },
  {
    Name: "_tag",
    Type: "token",
    Description: "Tags applied to this resource.[Resource.meta.tag]"
  }
  ]
  $scope.PatientSearchParametersList = [
    /* Patient's */
    {
      Name: "active",
      Type: "token",
      Description: "Whether the patient record is active"
    },
    {
      Name: "address",
      Type: "string",
      Description: "A server defined search that may match any of the string fields in the Address, including line, city, district, state, country, postalCode, and/or text"
    },
    {
      Name: "address-city",
      Type: "string",
      Description: "A city specified in an address"
    },
    {
      Name: "address-country",
      Type: "string",
      Description: "A country specified in an address"
    },
    {
      Name: "address-postalcode",
      Type: "string",
      Description: "A postalCode specified in an address"
    },
    {
      Name: "address-state",
      Type: "string",
      Description: "A state specified in an address"
    },
    {
      Name: "address-use",
      Type: "token",
      Description: "A use code specified in an address"
    },
    {
      Name: "birthdate",
      Type: "date",
      Description: "The patient's date of birth"
    },
    {
      Name: "death-date",
      Type: "date",
      Description: "The date of death has been provided and satisfies this search value"
    },
    {
      Name: "deceased",
      Type: "token",
      Description: "This patient has been marked as deceased, or as a death date entered"
    },
    {
      Name: "email",
      Type: "token",
      Description: "A value in an email contact"
    },
    {
      Name: "family",
      Type: "string",
      Description: "A portion of the family name of the patient"
    },
    {
      Name: "gender",
      Type: "token",
      Description: "Gender of the patient"
    },
    {
      Name: "general-practitioner",
      Type: "reference",
      Description: "Patient's nominated general practitioner, not the organization that manages the record"
    },
    {
      Name: "given",
      Type: "string",
      Description: "A portion of the given name of the patient"
    },
    {
      Name: "identifier",
      Type: "token",
      Description: "A patient identifier"
    },
    {
      Name: "language",
      Type: "token",
      Description: "Language code (irrespective of use value)"
    },
    {
      Name: "link",
      Type: "reference",
      Description: "All patients linked to the given patient"
    },
    {
      Name: "name",
      Type: "string",
      Description: " server defined search that may match any of the string fields in the HumanName, including family, give, prefix, suffix, suffix, and/or text"
    },
    {
      Name: "organization",
      Type: "reference",
      Description: "The organization that is the custodian of the patient record"
    },
    {
      Name: "phone",
      Type: "token",
      Description: "A value in a phone contact"
    },
    {
      Name: "phonetic",
      Type: "string",
      Description: "A portion of either family or given name using some kind of phonetic matching algorithm"
    },
    {
      Name: "telecom",
      Type: "token",
      Description: "The value in any kind of telecom details of the patient"
    }
  ]
  $scope.prefixesList = { eq: '=', ne: '≠', gt: '>', lt: '<', ge: '>=', le: '<=', sa: 'Start_After', eb: 'End_Before', ap: 'Approximately' };
  $scope.stringModifier = { '': 'Default', 'contains': 'Contains', 'exact': 'Exact' };
  $scope.tokenModifier = { '': 'Default', 'text': 'Text', 'not': 'Not', 'above': 'Above', 'below': 'Below', 'in': 'In', 'not-in': 'Not-in', 'of-type': 'Of-type' };

  $(function () {
    $('.selectpicker').selectpicker();
  });

  $scope.addParameter = (Type) => {
    if ($scope.newParameter) {
      let Key = $scope.newParameter;
      let Value = "",
        Modifier = "";
      if (Type == 'date') {
        Modifier = $scope.paraPrefixes;
        Text = Key + "=";
        if ($scope.dateKeyword) {
          Value = $scope.dateKeyword;
          Text += Modifier + Value;
        }
      } else {
        Modifier = $scope.paraModifier;
        Value = $scope.Keyword;
        (Modifier) ? (Text = Key + ":" + Modifier + "=" + Value) : (Text = Key + "=" + Value);
      }
      $scope.searchParameters.push({
        Key,
        Modifier,
        Value,
        Type
      });
      $scope.produceURL();
    }
  }

  $scope.rmParameter = (index) => {
    $scope.searchParameters.splice(index, 1);
    $scope.produceURL();
  }

  $scope.editParameter = (newValue) => {
    console.log(newValue);
  }

  $scope.getParaType = (para) => {
    let list = $scope.CommonSearchParametersList.concat($scope.PatientSearchParametersList);
    let data = list[list.findIndex(x => x.Name === para)];
    if (data) return data.Type;
  }

  $scope.HttpReq = (method, URL, data) => {
    // debug
    //console.log(method + ", " + URL);
    if (method == "PUT" && !confirm("Are you sure you want to PUT this data？")) return;
    if (method == "DELETE" && !confirm("Are you sure you want to DELETE this data？")) return;
    if (URL) {
      let Response;
      let options = {
        body: (method == "GET" || method == "DELETE") ? (data = null) : data,
        headers: {
          'content-type': 'application/fhir+json'
        },
        method
      }
      // For Bearer
      //if ($scope.Token) options.headers.Authorization = "Bearer " + $scope.Token;
      if ($scope.Token) options.headers.apikey = $scope.Token;

      fetch(URL, options).then(response => {
        Response = response;
        $scope.httpResult = method + "：HTTP " + response.status + " " + response.statusText;
        return response.json()
      }).then(Result => {
        // debug
        // console.log(Result);
        $scope.resResource = $scope.resource;
        switch (method) {
          case 'GET': {
            $scope.resultEntry = [];
            if (Response.status >= 200 && Response.status < 400) {
              $scope.ErrorInfo = "";
              $scope.selfPage = "";
              $scope.prevPage = "";
              $scope.nextPage = "";
              $scope.pageNum = 0;
              let splitStr = URL.split('_getpagesoffset=')[1];
              if (splitStr) {
                let pageNum = splitStr.split('=')[0];
                if (pageNum) $scope.pageNum = parseInt(pageNum);
              }
              if (Result.resourceType == "Bundle") {
                if (Result.link) {
                  Result.link.forEach(item => {
                    if (item.relation == "self") $scope.selfPage = item.url;
                    if (item.relation == "previous") $scope.prevPage = item.url;
                    if (item.relation == "next") $scope.nextPage = item.url;
                  });
                }
                $scope.resultEntry = Result.entry;
              } else {
                $scope.resultEntry.push({
                  fullUrl: Response.url,
                  resource: Result
                });
              }
            } else {
              alert("Can't GET data.\n" + Response.statusText);
              errorInfoDisplayer(Result);
            }
            break;
          }
          case 'POST': {
            if (Response.status >= 200 && Response.status < 400) {
              alert("POST Success！");
              $scope.ErrorInfo = "";
              $scope.resultEntry = [{
                fullUrl: Response.url,
                resource: Result
              }]
              $scope.prevPage = "";
              $scope.nextPage = "";
              //$scope.HttpReq("GET", Response.url + "/" + Result.id);
            } else {
              alert("POST Fail.\n" + Response.statusText);
              errorInfoDisplayer(Result);
            }
            break;
          }
          case 'PUT': {
            if (Response.status >= 200 && Response.status < 400) {
              alert("PUT Success！");
              $scope.ErrorInfo = "";
              $scope.resultEntry = [{
                fullUrl: Response.url,
                resource: Result
              }]
              $scope.prevPage = "";
              $scope.nextPage = "";
              // reload
              //if (!$scope.selfPage) $scope.selfPage = Response.url;
              //$scope.HttpReq("GET", $scope.selfPage);
            } else {
              alert("PUT Fail.\n" + Response.statusText);
              errorInfoDisplayer(Result)
            }
            break;
          }
          case 'DELETE': {
            if (Response.status >= 200 && Response.status < 400) {
              alert("DELETE Success！");
              $scope.ErrorInfo = "";
              $scope.resultEntry = [];
              $scope.prevPage = "";
              $scope.nextPage = "";
              // reload
              //if (!$scope.selfPage) $scope.selfPage = Response.url;
              //$scope.HttpReq("GET", $scope.selfPage);
              break;
            } else {
              alert("DELETE Fail.\n" + Response.statusText);
              errorInfoDisplayer(Result)
            }
          }
        }
        if ($scope.toolsIsOpen) toolsBtn.click();
        $scope.$applyAsync();
      }).catch(function (error) {
        console.log('ERROR: ', error.message);
        alert('Operation Failed');
        $scope.ErrorInfo = error.message;
        $scope.resultEntry = "";
        $scope.prevPage = "";
        $scope.nextPage = "";
        $scope.selfPage = "";
        $scope.pageNum = 0;
        $scope.httpResult = method + "：ERROR";
        $scope.$applyAsync();
      })
    }

    function errorInfoDisplayer(result) {
      let text = "";
      if (result.issue) {
        result.issue.forEach(item => {
          text += item.severity.toUpperCase() + "：" + item.code + " => " + item.diagnostics + "\n"
        })
      } else {
        text = result.msg;
      }

      $scope.ErrorInfo = text;
    }
  }

  $scope.produceURL = function () {
    $scope.URL = $scope.basePath;
    if ($scope.URL) {
      /* Resoure para */
      $scope.resource && ($scope.URL += "/" + $scope.resource);
      /* ID para */
      if ($scope.resource) {
        if ($scope.ID) {
          $scope.URL += "/" + $scope.ID;
          return;
        }
      }
      /* Search para */
      if ($scope.httpMethod == 'GET') {
        $scope.URL += "?_count=" + $scope._count;
        if ($scope._sort) {
          let Direction = ($scope.sortDirection) ? "" : "-";
          $scope.URL += "&_sort=" + Direction + $scope._sort;
        }
        $scope.searchParameters.forEach(item => {
          let Value = item.Value;
          if (item.Type == 'date') (item.Value) ? (Value = item.Value.toISOString()) : (Value = "");
          $scope.URL += "&" + item.Key + '=' + item.Modifier + Value;
        })
      }
    }
  }
  $scope.produceURL()

  $scope.showResource = function (data) {
    console.log(data)
    $scope.selectResourceURL = data.fullUrl;
    $scope.selectResource = JSON.stringify(data.resource, null, 4);
  }

  $scope.showIdentifier = function (data) {
    $scope.IdentifierData = data;
    $scope.displayMode = 'Identifier';
  }

  $scope.loadExample = function () {
    let example = {
      "resourceType": "Patient",
      "id": "example",
      "text": {
        "status": "generated",
        "div": "<div xmlns=\"http://www.w3.org/1999/xhtml\">\n\t\t\t<table>\n\t\t\t\t<tbody>\n\t\t\t\t\t<tr>\n\t\t\t\t\t\t<td>Name</td>\n\t\t\t\t\t\t<td>Peter James \n              <b>Chalmers</b> (&quot;Jim&quot;)\n            </td>\n\t\t\t\t\t</tr>\n\t\t\t\t\t<tr>\n\t\t\t\t\t\t<td>Address</td>\n\t\t\t\t\t\t<td>534 Erewhon, Pleasantville, Vic, 3999</td>\n\t\t\t\t\t</tr>\n\t\t\t\t\t<tr>\n\t\t\t\t\t\t<td>Contacts</td>\n\t\t\t\t\t\t<td>Home: unknown. Work: (03) 5555 6473</td>\n\t\t\t\t\t</tr>\n\t\t\t\t\t<tr>\n\t\t\t\t\t\t<td>Id</td>\n\t\t\t\t\t\t<td>MRN: 12345 (Acme Healthcare)</td>\n\t\t\t\t\t</tr>\n\t\t\t\t</tbody>\n\t\t\t</table>\n\t\t</div>"
      },
      "identifier": [{
        "system": "https://www.dicom.org.tw/cs/identityCardNumber_tw",
        "value": "xxx"
      },
      {
        "system": "https://www.dicom.org.tw/cs/passportNumber",
        "value": "yyy"
      },
      {
        "system": "https://www.dicom.org.tw/cs/ResidentNumber_tw",
        "value": "zzz"
      }
      ],
      "active": true,
      "name": [{
        "text": "xxxyyy",
        "family": "xxx",
        "given": ["yyy"]
      }],
      "telecom": [{
        "system": "email",
        "value": "xxx"
      },
      {
        "system": "phone",
        "value": "yyy",
        "use": "mobile"
      },
      {
        "system": "url",
        "value": "zzz"
      }
      ],
      "gender": "male",
      "birthDate": "1974-12-25",
      "address": [{
        "text": "eee aaabbbcccddd",
        "country": "aaa",
        "district": "bbb",
        "city": "ccc",
        "line": ["ddd"],
        "postalCode": "eee"
      }],
      "contact": [{
        "relationship": [{
          "coding": [{
            "system": "http://hl7.org/fhir/ValueSet/patient-contactrelationship",
            "code": "xxx"
          }],
          "text": "yyy"
        }],
        "name": {
          "text": "xxxyyy",
          "family": "xxx",
          "given": ["yyy"]
        },
        "telecom": [{
          "system": "email",
          "value": "xxx"
        },
        {
          "system": "phone",
          "value": "yyy",
          "use": "mobile"
        },
        {
          "system": "url",
          "value": "zzz"
        }
        ],
        "address": {
          "text": "eee aaabbbcccddd",
          "country": "aaa",
          "district": "bbb",
          "city": "ccc",
          "line": ["ddd"],
          "postalCode": "eee"
        }
      }],
      "managingOrganization": {
        "reference": "Organization/MITW.PHR"
      }
    }
    $scope.bodyData = JSON.stringify(example, null, 4);
  }

  $scope.parseCode = function (data){
    
    html_text = data.text
    coding_list = []
    for(coding of data.coding){
      coding_list.push(`<li><a href='${coding.system}' target='_blank'>${coding.code}<a/></li>`)
    }
    if(coding_list.length > 0){
      html_text += `<br/><ui>${coding_list.join('')}</ui>`
    }
    return html_text
  }
}).filter('mysce',function($http, $q, $log, $sce){
  // https://stackoverflow.com/questions/46280306/use-service-function-with-ng-bind-html-in-angularjs
  return function(text){
    return $sce.trustAsHtml(text);
  }
});