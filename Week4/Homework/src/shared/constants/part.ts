export const PART_VALUES = ['iOS', '안드로이드', '웹'] as const;

export const PART_OPTIONS = PART_VALUES.map((value) => ({value, label: value}));
