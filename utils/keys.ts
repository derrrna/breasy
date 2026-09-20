export const KEYS = {
    // Last selected breathing preset
    ACTIVE_PRESET: 'settings.activePreset',
    // The user's edited counts for Paced Breathing. Renamed from 'settings.custom*'
    // when the Custom preset was merged into Paced; old values are left orphaned.
    PACED_INHALE_COUNT: 'settings.pacedInhaleCount',
    PACED_EXHALE_COUNT: 'settings.pacedExhaleCount',
    PACED_CYCLE_COUNT: 'settings.pacedCycleCount',
    // Vibration strength of device (PWM)
    VIBRATION_STRENGTH: 'settings.vibrationStrength',
    // Whether the chime sound is on. Renamed from 'settings.mute': the stored value was
    // always isSoundOn, so the old key name inverted its meaning. Values under the old
    // key are left orphaned rather than migrated, they cannot be trusted either way.
    IS_SOUND_ON: 'settings.isSoundOn',
}