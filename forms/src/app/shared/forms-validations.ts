import { FormArray, FormControl, FormGroup } from '@angular/forms';

export class FormValidations {

    static requiredMinCheckbox(min = 1) {
        const validator = (formArray: FormArray) => {
            // const values = formArray.controls;
            // let totalChecked = 0;
            // for (let i = 0; i < values.length; i++) {
            //   if (values[i].value)
            //     totalChecked++;
            // }

            let totalChecked = formArray.controls
                .map(v => v.value)
                .reduce((total, current) => current ? total + current : total, 0);

            return totalChecked >= min ? null : { required: true };
        };
        return validator;
    }

    static cepValidator(control: FormControl) {
        let cep = control.value;
        if (cep && cep !== '') {
            cep = cep.replace(/\D/g, '');
            const validacep = /^[0-9]{8}$/;
            return validacep.test(cep) ? null : { cepInvalido: true }
        }
        return null;
    }

    static equalsTo(otherField: string) {
        const validator = (formControl: FormControl) => {
            if (otherField == null) {
                throw new Error('É necessário informar um campo');
            }

            // caso o formulario ainda não esteja pronto, retorna null
            if (!formControl.root || !(<FormGroup>formControl.root).controls) {
                return null;
            }

            const otherControl = (<FormGroup>formControl.root).get(otherField);
            if (otherControl == null) {
                throw new Error('É necessário informar um campo válido');
            }

            if (otherControl.value !== formControl.value) {
                return { equalsTo: otherField };
            }

            return null; // valido
        };
        return validator;
    }

    static getErrorMessage(fieldName: string, validatorName: string, validatorValue?: any) {
        const config = {
            'required': `${fieldName} é obrigatório.`,
            'minlength': `${fieldName} precisa ter no mínimo ${validatorValue.requiredLength} caracteres.`,
            'maxlength': `${fieldName} precisa ter no máximo ${validatorValue.requiredLength} caracteres.`,
            'cepInvalido': 'CEP inválido.',
            'emailJaCadastrado': 'Email já cadastrado',
            'email' : 'Email inválido',
            'equalsTo' : `${fieldName} deve ser igual ao campo ${validatorValue}`
        };

        return config[validatorName];
    }
}