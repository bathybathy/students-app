import React, {useReducer} from 'react';
import {useForm, Controller, SubmitHandler} from 'react-hook-form';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  PermissionsAndroid,
} from 'react-native';
import {MaskedTextInput} from 'react-native-mask-text';
import {api, buscaCep} from '../../api';
import * as CONSTANTS from '../../constants';
import * as yup from 'yup';
import {useDispatch} from 'react-redux';
import DocumentPicker, {
  DirectoryPickerResponse,
  DocumentPickerResponse,
  isInProgress,
  types,
} from 'react-native-document-picker';
import {yupResolver} from '@hookform/resolvers';

interface IForm {
  nome: string;
  rua: string;
  cep: string;
  bairro: string;
  numero: string;
  complemento: string;
  cidade: string;
  estado: string;
  file: any;
}

const schema = yup.object().shape({
  nome: yup.string().max(40).required('Campo obrigatório'),
  cep: yup.string().max(9).required('Campo obrigatório'),
  rua: yup.string().max(40).required('Campo obrigatório'),
  bairro: yup.string().max(40).required('Campo obrigatório'),
  numero: yup.string().max(10).required('Campo obrigatório'),
  cidade: yup.string().max(40).required('Campo obrigatório'),
  estado: yup.string().max(40).required('Campo obrigatório'),
  file: yup.mixed().required('Campo obrigatório'),
});

const Form = () => {
  const [result, setResult] = React.useState<
    Array<DocumentPickerResponse> | DirectoryPickerResponse | undefined | null
  >();
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    setValue,
    formState: {errors},
  } = useForm<IForm>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<IForm> = async data => {
    try {
      await api.post('', data);
    } catch (error) {}
  };

  const handleCepChange = async cep => {
    //console.log(cep.split('').length);
    if (cep.split('').length === 8) {
      try {
        const {data} = await buscaCep.get(`${cep}/json`);
        if (data) {
          setValue('rua', data.logradouro);
          setValue('bairro', data.bairro);
          setValue('cidade', data.localidade);
          setValue('estado', data.uf);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <View style={styles.container}>
      <Text>form</Text>

      <Controller
        name="nome"
        control={control}
        render={({field}) => <TextInput {...field} maxLength={40} />}
      />

      <Controller
        name="cep"
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <MaskedTextInput
            mask="99999-999"
            value={value}
            onChangeText={(text, rawText) => handleCepChange(rawText)}
            maxLength={9}
            placeholder="CEP"
          />
        )}
      />

      <Controller
        name="rua"
        control={control}
        render={({field}) => (
          <TextInput placeholder="Rua" {...field} maxLength={40} />
        )}
      />

      <Controller
        name="numero"
        control={control}
        render={({field}) => (
          <TextInput placeholder="Numero" {...field} maxLength={40} />
        )}
      />

      <Controller
        name="complemento"
        control={control}
        render={({field}) => (
          <TextInput placeholder="Complemento" {...field} maxLength={40} />
        )}
      />

      <Controller
        name="bairro"
        control={control}
        render={({field}) => (
          <TextInput placeholder="Bairro" {...field} maxLength={40} />
        )}
      />

      <Controller
        name="cidade"
        control={control}
        render={({field}) => (
          <TextInput placeholder="Cidade" {...field} maxLength={40} />
        )}
      />

      <Controller
        name="estado"
        control={control}
        render={({field}) => (
          <TextInput placeholder="Estado" {...field} maxLength={40} />
        )}
      />

      <Controller
        name="estado"
        control={control}
        render={({field}) => (
          <Button
            title="Upload"
            {...field}
            onPress={async () => {
              await PermissionsAndroid.request(
                'android.permission.READ_EXTERNAL_STORAGE',
              );

              try {
                const pickerResult = await DocumentPicker.pickSingle({
                  presentationStyle: 'fullScreen',
                  copyTo: 'cachesDirectory',
                  type: ['image/jpg', 'image/jpeg'],
                });
                console.log(pickerResult);
                setResult([pickerResult]);
              } catch (e) {}
            }}
          />
        )}
      />
    </View>
  );
};

export default Form;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
