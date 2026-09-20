export const KEYS = {
    // Last selected breathing preset
    ACTIVE_PRESET: 'settings.activePreset',
    // Stores user's custom inhale, exhale and cycle counts independently.
    CUSTOM_INHALE_COUNT: 'settings.customInhaleCount',
    CUSTOM_EXHALE_COUNT: 'settings.customExhaleCount',
    CUSTOM_CYCLE_COUNT: 'settings.customCycleCount',
    // Vibration strength of device (PWM)
    VIBRATION_STRENGTH: 'settings.vibrationStrength',
    // Whether the chime sound is on. Renamed from 'settings.mute': the stored value was
    // always isSoundOn, so the old key name inverted its meaning. Values under the old
    // key are left orphaned rather than migrated, they cannot be trusted either way.
    IS_SOUND_ON: 'settings.isSoundOn',
}