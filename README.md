# Breasy

### **Status: Work in Progress**

A React Native breathing exercise app paired with **'Froggie**, a Bluetooth haptic companion device designed to guide paced breathing during anxiety or panic without requiring the phone to stay in view.

## Tech Stack

### **App** 
- React Native
- Expo
- TypeScript
- NativeWind

### **Key Hardware Components** 
- Seeed Studio XIAO Microcontroller
- Vibration motor

## Features

### Current

- Play button →  triggers visual numeric countdown

### App Planned Features

- Descending pitch audio tones synced to countdown
- Continuous cycle looping
- Pause / Stop controls
- Mute / unmute toggle
- Switchable breathing presets (box breathing, customisable inhale-exhale count)
- Settings page (navigation exists, no functionality yet)
- Local persistence of selected preset + mute state

### Froggie Planned Features

'Froggie' is a small Bluetooth device that is attachable to a keychain. It is designed to vibrate in sync with the app's breathing countdown, so the user's phone can stay in a pocket.

- **Enclosure:** 3D printed
- **Circuit:** ESP32C3 → transistor-driven vibration motor, two status LEDs (power / BLE-paired)
- **Connectivity:** BLE bond-once/reconnect-always; device vibration state mirrors app state, no independent local pattern
- **Not yet implemented:** BLE communication, PWM intensity control, enclosure fabrication