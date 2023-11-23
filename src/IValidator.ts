export default interface IValidator<TValue, TValidateAgainst> {
    Validate(value: TValue, validateAgainst: TValidateAgainst): boolean;
}