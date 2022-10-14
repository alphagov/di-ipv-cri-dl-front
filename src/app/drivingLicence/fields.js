const { firstNameMiddleNameLengthValidator } = require("./fieldsHelper");

const firstNameMiddleNameLengthValidatorObj = {
  fn: firstNameMiddleNameLengthValidator,
  arguments: [30, "firstName", "middleNames"],
};

module.exports = {
  firstNameMiddleNameLengthValidator: firstNameMiddleNameLengthValidator,
  surname: {
      type: "text",
      validate: [
        "required",
        { type: "maxlength", arguments: [30] },
        { type: "regexDrivingLicence", fn: (value) => value.match(/^[a-zA-Z .'-]*$/) },
      ],
      journeyKey: "surname",
    },
    firstName: {
      type: "text",
      validate: [
        "required",
        { type: "maxlength", arguments: [30] },
        { type: "regexDrivingLicence", fn: (value) => value.match(/^[a-zA-Z .'-]*$/) },
        {
          type: "firstNameMiddleNameLength",
          ...firstNameMiddleNameLengthValidatorObj,
        },
      ],
      journeyKey: "firstName",
    },
    middleNames: {
      type: "text",
      journeyKey: "middleNames",
      validate: [
        { type: "maxlength", arguments: [30] },
        { type: "regexDrivingLicence", fn: (value) => value.match(/^[a-zA-Z .'-]*$/) },
        {
          type: "firstNameMiddleNameLength",
          ...firstNameMiddleNameLengthValidatorObj,
        },
      ],
    },
  dateOfBirth: {
    type: "date",
    journeyKey: "dateOfBirth",
    validate: [
      "required",
      "date",
      { type: "before", arguments: [new Date().toISOString().split("T")[0]] }
    ],
  },
  issueDate: {
    type: "date",
    journeyKey: "issueDate",
    validate: [
      "required",
      "date",
      { type: "before", arguments: [new Date().toISOString().split("T")[0]] }
    ],
    dependent: {field: "dvlaDependent", value: "DVLA"}
  },
  dvlaDependent: {
     type: "hidden",
     label: "",
     legend: "",
     default: "DVLA"
  },
  dvaDependent: {
     type: "hidden",
     label: "",
     legend: "",
     default: "DVA"
  },
  expiryDate: {
    type: "date",
    journeyKey: "expiryDate",
    validate: [
      "required",
      "date",
      { type: "after", arguments: [new Date().toISOString().split("T")[0]] }
    ],
  },
  drivingLicenceNumber: {
    type: "text",
    journeyKey: "drivingLicenceNumber",
    validate: [
      "required",
      { type: "exactlength", arguments: [16] },
      { type: "regexDrivingLicence", fn: (value) => value.match(/^(?=.{16}$)[A-Za-z]{1,5}9{0,4}[0-9](?:[05][1-9]|[16][0-2])(?:[0][1-9]|[12][0-9]|3[01])[0-9](?:99|[A-Za-z][A-Za-z9])(?![IOQYZioqyz01_])\w[A-Za-z]{2}$/) }
    ],
    dependent: {field: "dvlaDependent", value: "DVLA"},
    classes: "govuk-input--width-10",
  },
  dvaLicenceNumber: {
    type: "text",
    journeyKey: "dvaLicenceNumber",
    validate: [
      "required",
      { type: "exactlength", arguments: [8] },
      { type: "regexDrivingLicence", fn: (value) => value.match(/^[0-9]{8}$/) }
    ],
    dependent: {field: "dvaDependent", value: "DVA"},
    classes: "govuk-input--width-10",
  },
  issueNumber: {
    type: "text",
    journeyKey: "issueNumber",
    validate: [
      "required",
      { type: "exactlength", arguments: [2] },
      { type: "regexDrivingLicence", fn: (value) => value.match(/^[0-9]{2}$/) }
    ],
    dependent: {field: "dvlaDependent", value: "DVLA"},
    classes: "govuk-input--width-10",
  },
  postcode: {
    type: "text",
    journeyKey: "postcode",
    validate: [
      "required",
      { type: "maxlength", arguments: [7] },
      { type: "minlength", arguments: [5] },
      { type: "regexPostcode", fn: (value) => value.match(/([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))\s?[0-9][A-Za-z]{2})/) }
    ],
    classes: "govuk-input--width-10",
  },
  proveAnotherWayRadio: {
    type: "radios",
    items: ["proveAnotherWay", "retry"],
    validate: ["required"],
  },
    licenceIssuerRadio: {
      type: "radios",
      label: "",
      legend: "",
      items: [{value:"DVLA"}, {value:"DVA"}, {divider: "Or"}, {value:"noLicence"}],
      validate: ["required"],
    },
};
