import {Text, View} from "react-native";
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import BottomBar from "@/app/components/bottomBar";
import Header from "@/app/components/header";

export default function Index() {

    return (
        <View className={"flex flex-col w-full h-full"}>

            {/* HEADER */}
            <Header/>

            {/* CONTENT */}
            <View className={"flex-1 bg-white justify-center items-center"}>
                <Text className={"mb-16"}> Bluetooth Connection</Text>
                <AnimatedCircularProgress
                    size={350}
                    width={20}
                    fill={50}
                    tintColor={"#76C893"}
                    backgroundColor={"#76C89370"}
                    lineCap={"round"}
                    rotation={0}
                >
                </AnimatedCircularProgress>
                <Text className={"color-[#168AAD] text-8xl mt-5"}>5</Text>
            </View>

            {/* BOTTOM BAR */}
            <BottomBar/>

        </View>
    );
}
