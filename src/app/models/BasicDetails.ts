export class BasicDetails {
  constructor(country: string, email: string, firstName: string, lastName: string, phoneNumber: string, state: string) {
    this._country = country;
    this._email = email;
    this._firstName = firstName;
    this._lastName = lastName;
    this._phoneNumber = phoneNumber;
    this._state = state;
  }

  private _country: string;

  get country(): string {
    return this._country;
  }

  set country(value: string) {
    this._country = value;
  }

  private _email: string;

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  private _firstName: string;

  get firstName(): string {
    return this._firstName;
  }

  set firstName(value: string) {
    this._firstName = value;
  }

  private _lastName: string;

  get lastName(): string {
    return this._lastName;
  }

  set lastName(value: string) {
    this._lastName = value;
  }

  private _phoneNumber: string;

  get phoneNumber(): string {
    return this._phoneNumber;
  }

  set phoneNumber(value: string) {
    this._phoneNumber = value;
  }

  private _state: string;

  get state(): string {
    return this._state;
  }

  set state(value: string) {
    this._state = value;
  }
}
