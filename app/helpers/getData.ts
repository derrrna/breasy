import AsyncStorage from "@react-native-async-storage/async-storage";

const getData = async (key: string) => {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
            return value
        }
    } catch (e) {
        //TODO
        console.error(e)
    }
}