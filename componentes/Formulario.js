/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet , ActivityIndicator, TouchableHighlight, Alert} from 'react-native';
import { Picker } from '@react-native-community/picker';
import axios from 'axios';

const Formulario = ({moneda, criptomoneda, guardarMoneda, guardarCriptomoneda,guardarConsultarAPI}) =>{

    // este segundo muestra el estado de las 10 criptomonedas mas importantes
    const [criptomonedas, guardarCriptomonedas] = useState([]);

    useEffect (() => {
        const consultarApi = async() => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
            const resultado = await axios.get(url);
            guardarCriptomonedas(resultado.data.Data);
        };
        consultarApi();
        
        
    }, []);
    console.log(criptomonedas);
    
    const obtenerMoneda = moneda =>{
        guardarMoneda(moneda);
    };
    // almanecena las selecciones del usuario
    const obtenerCriptoMoneda = cripto =>{
        guardarCriptomoneda(cripto);
    };

    const cotizarPrecio = () => {
        if (moneda.trim() === '' || criptomoneda.trim() === ''){
            mostrarAlert();
            return;
        }
        // cambiar el state de consultar api y pasa a ser TRUE
        guardarConsultarAPI(true)
    }

    const mostrarAlert = () =>{
        Alert.alert(
            'Error...',
            'Ambos campos es obligatorio',
            [
                {text:"Ok"}
            ],
            // se pasa la validacion
            console.log('contizando')
        )
    }

    // Se le pone los [] ya que hay diferentes opciones para mostrar, es un ARRAY de dependencias (vacios en este caso)

    return (
        
        <>
        <View>
            <Text style={styles.label}>Moneda</Text>
            <Picker
                // con selecvalue se toma el State de la moneda seleccionada para que esta la renderize/muestre en pantalla
                selectedValue={moneda}
                onValueChange={ moneda => obtenerMoneda(moneda)}
                itemStyle={{height: 120 }}
            >
                <Picker.Item label="- Seleccione -" value=""/>
                <Picker.Item label="Dolar de Estados Unidos" value="USD"/>
                <Picker.Item label="Peso Mexicano" value="MXN"/>
                <Picker.Item label="Euro" value="EUR"/>
                <Picker.Item label="Libra Esterlina" value="GBP"/>
            </Picker>
            <Text style={styles.label}>Criptomoneda</Text>
            <Picker
                // con selecvalue se toma el State de la moneda seleccionada para que esta la renderize/muestre en pantalla
                selectedValue={criptomoneda}
                onValueChange={ cripto => obtenerCriptoMoneda(cripto)}
                >
                <Picker.Item label="- Seleccione -" value=""/>

                {/* {criptomonedas && Array.isArray(criptomonedas) && criptomonedas.map(cripto => (
                <Picker key={cripto.CoinInfo.Id} label={cripto.CoinInfo.FullName} value={cripto.CoinInfo.Name}/>
                ))}; */}

                {criptomonedas.map( cripto => (
                <Picker key={cripto.CoinInfo.Id} label={cripto.CoinInfo.FullName} value={cripto.CoinInfo.Name}/>
                ))}

            </Picker>
            
            <TouchableHighlight
                    style={styles.btnCotizar}
                    onPress= {() => cotizarPrecio()}
                >
                    <Text style={styles.textoCotizar}>Cotizar</Text>
                </TouchableHighlight>

        </View>
        </>
    );
}

const styles = StyleSheet.create({
    label: {
        fontFamily: 'Lato-Black',
        textTransform: 'uppercase',
        fontSize: 22,
        marginVertical: 20,
    },
    btnCotizar: {
        backgroundColor:"#5E49E2",
        padding: 10,
        marginTop: 20,
    },
    textoCotizar:{
        color: '#FFF',
        fontSize: 18,
        fontFamily:'Lato-Black',
        textTransform:'uppercase',
        textAlign:'center'
    }
});

export default Formulario;