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
import {yupResolver} from '@hookform/resolvers/yup';

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
    reset,
  } = useForm<IForm>({});

  const onSubmit: SubmitHandler<IForm> = async (data: IForm) => {
    console.log(data);
    const dataAsFormData = new FormData();

    dataAsFormData.append('nome', data.nome);
    dataAsFormData.append('rua', data.rua);
    dataAsFormData.append('numero', data.numero);
    dataAsFormData.append('bairro', data.bairro);
    dataAsFormData.append('cidade', data.cidade);
    dataAsFormData.append('estado', data.estado);
    dataAsFormData.append('file', data.file);
    if (data.complemento) {
      dataAsFormData.append('complemento', data.complemento);
    }
    try {
      const oi = await api.post('/criar', dataAsFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      reset();
      console.log(oi, 'oi');
    } catch (error) {}
  };

  const handleCepChange = async (cep, onChange) => {
    //console.log(cep.split('').length);
    //onChange?.();
    if (cep.split('').length === 8) {
      try {
        const {data} = await buscaCep.get(`${cep}/json`);
        if (data) {
          setValue('cep', cep);
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
        render={({field: {onChange, value, onBlur}}) => (
          <TextInput
            style={styles.input}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            maxLength={40}
          />
        )}
      />
      <Text style={styles.errors}>{errors.nome?.message}</Text>

      <Controller
        name="cep"
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <MaskedTextInput
            style={styles.input}
            mask="99999-999"
            value={value}
            onChangeText={(text, rawText) => handleCepChange(rawText, onChange)}
            maxLength={9}
            placeholder="CEP"
            onBlur={onBlur}
          />
        )}
      />
      <Text style={styles.errors}>{errors.cep?.message}</Text>

      <Controller
        name="rua"
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            style={styles.input}
            placeholder="Rua"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            maxLength={40}
          />
        )}
      />
      <Text style={styles.errors}>{errors.rua?.message}</Text>

      <Controller
        name="numero"
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            style={styles.input}
            placeholder="Numero"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            maxLength={40}
          />
        )}
      />
      <Text style={styles.errors}>{errors.numero?.message}</Text>

      <Controller
        name="complemento"
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            style={styles.input}
            placeholder="Complemento"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            maxLength={40}
          />
        )}
      />

      <Controller
        name="bairro"
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            style={styles.input}
            placeholder="Bairro"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            maxLength={40}
          />
        )}
      />
      <Text style={styles.errors}>{errors.bairro?.message}</Text>

      <Controller
        name="cidade"
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            style={styles.input}
            placeholder="Cidade"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            maxLength={40}
          />
        )}
      />
      <Text style={styles.errors}>{errors.cidade?.message}</Text>

      <Controller
        name="estado"
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            style={styles.input}
            placeholder="Estado"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            maxLength={40}
          />
        )}
      />
      <Text style={styles.errors}>{errors.estado?.message}</Text>

      <Controller
        name="file"
        control={control}
        render={({field: {onChange, value}}) => (
          <Button
            title="Upload"
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
                onChange?.();
                setValue('file', pickerResult);
                setResult([pickerResult]);
              } catch (e) {}
            }}
          />
        )}
      />
      <Text style={styles.errors}>{errors.file?.message}</Text>

      <Button onPress={handleSubmit(onSubmit)} title="Enviar" />
    </View>
  );
};

export default Form;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
    marginVertical: 32,
  },
  errors: {
    fontSize: 11,
    color: 'red',
    marginBottom: 16,
  },
  input: {borderBottomWidth: 1},
});
