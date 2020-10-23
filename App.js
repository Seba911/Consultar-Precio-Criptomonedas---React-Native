/* eslint-disable prettier/prettier */
import React , {useState, useEffect}from 'react';
import { StyleSheet, Image, View, ScrollView, ActivityIndicator } from 'react-native';

import Header from './componentes/Header';
import Formulario from './componentes/Formulario';
import axios from 'axios'
import Cotizacion from './componentes/Cotizacion'

const App = () => {

  const [moneda, guardarMoneda] = useState('');
  // este primer state de criptomoneda sirve para saber la seleccion del usuario
  const [criptomoneda, guardarCriptomoneda] = useState('');
                                // Se pasa en false asi no se pasa directamente, sino esperar a que haya una moneda y una criptomoneda 
  const [consultarAPI, guardarConsultarAPI] = useState(false)

  const [resultado, guardarResultado] = useState({})

  const [cargando, guardarCargando] = useState(false)

  // Una vez que consultarAPI cambia, la idea es consultar la api por que ya moneda y criptomoneda van a tener un valor valido,
  // pero como saber cuando "consultarAPI" cambia, como saber cuando este cambia de FALSE a TRUE.. esto se logra con el useEffect

  // useEffect (() => {
  //   const cotizarCriptoMoneda = async () => {
  //     if(consultarAPI) {
  //       // consultar la api para cotizacion
  //       const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
  //       const resultado = await axios.get(url);

  //       // console.log(resultado.data.DISPLAY[criptomoneda][moneda])
  //       guardarCargando(true);

  //     // ocultar el spinner y mostrar resultado
  //     setTimeout(() =>{
  //       guardarResultado(resultado.data.DISPLAY[criptomoneda][moneda])
  //       guardarConsultarAPI(false),
  //       guardarCargando(false);
  //     }, 3000); 
  //     }
      
  //   }
  //   cotizarCriptoMoneda()
  // }, [consultarAPI] )

  useEffect (() => {
    const cotizarCriptoMoneda = async () => {
      if(consultarAPI) {
        // consultar la api para cotizacion
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
          axios.get(url).then(data => {
          guardarResultado(data.data.DISPLAY[criptomoneda][moneda])
          guardarConsultarAPI(false),
          guardarCargando(false);
          console.log(data.data.DISPLAY[criptomoneda][moneda])
        });

        // console.log(resultado.data.DISPLAY[criptomoneda][moneda])
        guardarCargando(true);

      // ocultar el spinner y mostrar resultado
      setTimeout(() =>{
        
      }, 3000); 
      }
      
    }
    cotizarCriptoMoneda()
  }, [consultarAPI] )

  // mostrar spinner o resultado
  const componente = cargando ? <ActivityIndicator size='large' color='#5E49E2'/> : <Cotizacion resultado={resultado}/>

// dependencia consultarAPI al final
  return (
    <>
    <ScrollView>
      <Header />
      <Image
        style={styles.imagen}
        source={require('./assets/img/cryptomonedas.png')}
      />
      <View style={styles.contenido}>
        <Formulario 
          moneda={moneda}
          criptomoneda={criptomoneda}
          guardarMoneda={guardarMoneda}
          guardarCriptomoneda={guardarCriptomoneda}
          guardarConsultarAPI={guardarConsultarAPI}
          />
      </View>
      <View style={{marginTop: 40}}>
        {componente}
      </View>
       </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  imagen:{
    width: '100%',
    height: 150,
    marginHorizontal: '2.5%',
  },
  contenido:{
    marginHorizontal: '2.5%',
  },
});

export default App;
