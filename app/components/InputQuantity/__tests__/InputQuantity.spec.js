const React = require('react');
const { screen, render, fireEvent } = require('@testing-library/react');
const InputQuantity = require('..');

describe('InputQuantity component', () => {
    let component;
    let error = '';
    let setError = jest.fn(value => { error = value; });
    let setQuantityToBuy = jest.fn();
    let input;

    beforeEach(() => {
        component = render(<InputQuantity
            className={'checkout__input'}
            tabIndex={12}
            error={error}
            setError={setError}
            quantityToBuy={'3'}
            setQuantityToBuy={setQuantityToBuy}
            availableQuantity={2}
        />);
        input = screen.getByRole('spinbutton', {
            name: /ingrese la cantidad de productos a comprar/i
        });
    });
    it('should render correctly', () => {
        const { asFragment } = component;
        expect(asFragment()).toMatchSnapshot();
    });

    it('when entering a value in the input the setQuantityToBuy function is called with the entered value', () => {
        fireEvent.change(input, { target: { value: '2' } });
        expect(error).toBe('');
        expect(setQuantityToBuy).toHaveBeenCalledWith('2');
    });

    it('if the value entered in input is negative , setQuantityToBuy is called with "1" as value', () => {
        fireEvent.change(input, { target: { value: '-1' } });
        expect(error).toBe('');
        expect(setQuantityToBuy).toHaveBeenCalledWith('1');
    });

    it('if the value entered in the input is greater than the quantity available, an error message appears indicating the quantity available to buy', () => {
        fireEvent.change(input, { target: { value: '4' } });
        expect(setError).toHaveBeenCalledWith('Puedes comprar hasta 2 unidades');
        expect(setQuantityToBuy).toHaveBeenCalledWith('4');
        expect(error).toBe('Puedes comprar hasta 2 unidades');
    });

    it('if the value of the input is empty, setError must be called with "Puedes comprar mínimo 1 unidad" being this the error message', () => {
        fireEvent.change(input, { target: { value: '' } });
        expect(setError).toHaveBeenCalledWith('Puedes comprar mínimo 1 unidad');
        expect(setQuantityToBuy).toHaveBeenCalledWith('');
        expect(error).toBe('Puedes comprar mínimo 1 unidad');
    });
});