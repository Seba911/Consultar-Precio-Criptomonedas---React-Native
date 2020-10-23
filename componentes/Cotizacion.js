/* eslint-disable prettier/prettier */
import React from 'react'
import {Text, View, StyleSheet } from 'react-native';

const Cotizacion = ({resultado}) => {
  if (Object.keys(resultado).length === 0) return null;

  return (

        <View style={styles.resultado}>
            <Text style={[styles.texto, styles.precio]}>
                <Text style={styles.span}>{resultado.PRICE}</Text>
            </Text>
            <Text style={styles.texto}>Precio mas alto del dia: { ' ' }
                <Text style={styles.span}>{resultado.HIGHDAY} </Text>
            </Text>
            <Text style={styles.texto}>Precio más bajo del dia: { ' ' }
                <Text style={styles.span}>{resultado.LOWDAY} </Text>
            </Text>
            <Text style={styles.texto}>Variacion últimas 24 hs: { ' ' }
                <Text style={styles.span}>{resultado.CHANGEPCT24HOUR} </Text>
            </Text>
            <Text style={styles.texto}>Última Actualización: { ' ' }
                <Text style={styles.span}>{resultado.LASTUPDATE} </Text>
            </Text>
        </View>
   
    );
};

const styles = StyleSheet.create({
    resultado:{
        backgroundColor:'#5E49E2',
        padding: 20,
    },
    texto:{
        color:'#FFF',
        fontFamily:'Lato-Regular',
        fontSize:18,
        marginBottom:10,
    },

    precio: {
        fontSize:38,
    },
    span:{
        fontFamily:'Lato-Black',
    }
})

export default Cotizacion;
