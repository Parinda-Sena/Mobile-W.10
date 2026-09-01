import { StyleSheet, Text, View,ActivityIndicator,StatusBar } from 'react-native';
import {Suspense} from 'react';
import {SQLiteProvidor} from 'expo-sqlite';
import {DATABASE_NAME, initDb} from './src/db/db';

export default function App() {
    return(
        <>
    <StatusBar barStyle='light-content' backgroundColor='#0D1117'/>
    <Suspense fallback = {<loading/>}>
        <SQLiteProvider databaseName={DATABASE_NAME} onInit={initDb}
        useSuspense>
        <ExpenseScreen/>
        </SQLiteProvider>
    </Suspense>
    </>
    );
}

function loading() {
    <View syyle ={styles.container}>
        <ActivityIndicator size= 'large' color='#61DAFB'/>
        <Text style={styles.text}>กำลังโหลดฐานข้อมูล.....</Text>
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0D1117',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12
    },
}) 
const COLORS = {
    bg:'#0D1117', 
    card: '#161B22',
    border: '#30363D',
    text: '#E6EDF3',
    dim: '#8B949E',
    cyan: '#61DAFB',
    red: '#F85149'
}

const TOP = Platform.select({
    ios:56,
    android:(StatusBar.currentHeight ?? 24) + 10,
    default: 24
})
