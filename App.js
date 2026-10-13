import { StyleSheet, Text, View, ActivityIndicator, StatusBar, Platform } from 'react-native';
import { Suspense } from 'react';
import { SQLiteProvider } from 'expo-sqlite'; 
import { DATABASE_NAME, initDb } from './src/db/db';
import ExpenseScreen from './src/screens/ExpenseScreen'; 

export default function App() {
    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor="#0D1117" />
            <Suspense fallback={<Loading />}>
                <SQLiteProvider 
                    databaseName={DATABASE_NAME} 
                    onInit={initDb}
                    useSuspense
                >
                    <ExpenseScreen />
                </SQLiteProvider>
            </Suspense>
        </>
    );
}

function Loading() {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color="#61DAFB" />
            <Text style={styles.text}>กำลังโหลดฐานข้อมูล.....</Text>
        </View>
    );
}

const COLORS = {
    bg: '#0D1117', 
    card: '#161B22',
    border: '#30363D',
    text: '#E6EDF3',
    dim: '#8B949E',
    cyan: '#61DAFB',
    red: '#F85149'
};

const TOP = Platform.select({
    ios: 56,
    android: (StatusBar.currentHeight ?? 24) + 10,
    default: 24
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.bg,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12
    },
    text: {
        color: COLORS.text,
        fontSize: 16
    }
});
