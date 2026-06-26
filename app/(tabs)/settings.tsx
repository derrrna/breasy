import Header from "@/app/components/header";
import {ScrollView, Text, View} from 'react-native';
import RadioButton from "@/app/components/radioButton";

export default function Settings(){

    const handleRadioPress = () => {}

    return (
        <View>
            <Header/>

            {/* FORM TODO: make as radio button components. Use FieldGroup*/}
            <ScrollView>

            </ScrollView>
            <Text>Exercise Presets</Text>
            <View className={'flex-col'}>
                <RadioButton optionName={"Box Breathing"} handlePress={handleRadioPress}/>
                <RadioButton optionName={"TIPP"} handlePress={handleRadioPress}/>
                <RadioButton optionName={"Third Option"} handlePress={handleRadioPress}/>
            </View>
            <Text>Custom</Text>
            <View>
                <Text>Inhale Count</Text>

            </View>
        </View>
    )

}