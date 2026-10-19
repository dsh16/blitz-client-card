<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.65"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <g v-if="name === 'car'">
      <path
        d="m5 9 2-5h10l2 5M3 10l2-1h14l2 1v9H3zM3 14h18M6 19v2m12-2v2M6 12h2m8 0h2"
      />
    </g>
    <g v-else-if="name === 'calendar'">
      <rect x="4" y="5" width="16" height="16" rx="2" />
      <path d="M8 3v4m8-4v4M4 11h16m-12 4h3m2 0h3m-8 3h3" />
    </g>
    <g v-else-if="name === 'users'">
      <circle cx="9" cy="8" r="3" />
      <path
        d="M3 20v-2a6 6 0 0 1 12 0v2zm13-15a3 3 0 0 1 0 6m2 3a5 5 0 0 1 3 5v1"
      />
    </g>
    <g v-else-if="name === 'team'">
      <circle cx="12" cy="7" r="2.5" />
      <circle cx="4" cy="10" r="1.5" />
      <circle cx="20" cy="10" r="1.5" />
      <path
        d="M7 20v-3a5 5 0 0 1 10 0v3zM2 20v-3a3 3 0 0 1 3-3m17 6v-3a3 3 0 0 0-3-3"
      />
    </g>
    <g v-else-if="name === 'network'">
      <circle cx="12" cy="12" r="3" />
      <circle cx="5" cy="4" r="2" />
      <circle cx="20" cy="6" r="2" />
      <circle cx="4" cy="20" r="2" />
      <circle cx="20" cy="20" r="2" />
      <path d="m6 6 4 4m4 0 4-3M6 18l4-4m4 0 4 4" />
    </g>
    <g v-else-if="name === 'chart'">
      <path d="M11 3a9 9 0 1 0 10 10H11z" />
      <path d="M14 3v7h7a8 8 0 0 0-7-7" />
    </g>
    <g v-else-if="name === 'wallet'">
      <path d="M20 8V5a2 2 0 0 0-2-2H6a3 3 0 0 0 0 6h14v12H6a3 3 0 0 1-3-3V6" />
      <path d="M20 12h-5v5h5m-3-2.5h.01" />
    </g>
    <g v-else-if="name === 'card'">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 10h18m-14 5h4" />
    </g>
    <g v-else-if="name === 'settings'">
      <path
        d="m10 3-.6 2.3-2.2 1L5 5.6 3 9l1.7 1.7v2.6L3 15l2 3.4 2.2-.7 2.2 1L10 21h4l.6-2.3 2.2-1 2.2.7 2-3.4-1.7-1.7v-2.6L21 9l-2-3.4-2.2.7-2.2-1L14 3z"
      />
      <circle cx="12" cy="12" r="3" />
    </g>
    <g v-else-if="name === 'bell'">
      <path
        d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9m-11 9h10m-7 3h4"
      />
    </g>
    <g v-else-if="name === 'help'">
      <circle cx="12" cy="12" r="9" />
      <path d="M9.5 9a2.5 2.5 0 1 1 4 2c-1.5.8-1.5 1.3-1.5 2m0 3h.01" />
    </g>
    <g v-else-if="name === 'logout'">
      <path d="M13 5V3H4v18h9v-2m-3-7h11m-3-3 3 3-3 3" />
    </g>
    <g v-else-if="name === 'phone'">
      <path
        d="M7 3 4 4c-3 5 7 15 12 15l3-3-5-4-2 2a12 12 0 0 1-4-4l2-2zM15 3a6 6 0 0 1 6 6m-6-2a2 2 0 0 1 2 2"
      />
    </g>
    <g v-else-if="name === 'mail'">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </g>
    <g v-else-if="name === 'tag'">
      <path d="M3 5v7l9 9 9-9-9-9H5a2 2 0 0 0-2 2z" />
      <circle cx="8" cy="8" r="1.5" />
    </g>
    <g v-else-if="name === 'bars'">
      <path d="M4 20V12h3v8zm7 0V4h3v16zm7 0V9h3v11z" />
    </g>
    <g v-else-if="name === 'copy'">
      <rect x="8" y="7" width="12" height="14" rx="2" />
      <path d="M15 7V3H4v14h4" />
    </g>
    <g v-else-if="name === 'edit'">
      <path d="m4 15-1 6 6-1L21 8l-5-5zM13 6l5 5M4 15l5 5" />
    </g>
    <g v-else-if="name === 'back'"><path d="M20 12H4m6-6-6 6 6 6" /></g>
    <g v-else-if="name === 'chevron'"><path d="m9 5 7 7-7 7" /></g>
    <g v-else-if="name === 'plus'"><path d="M12 5v14M5 12h14" /></g>
    <g v-else-if="name === 'close'"><path d="m6 6 12 12M6 18 18 6" /></g>
    <g v-else-if="name === 'check'"><path d="m5 12 4 4L19 6" /></g>
    <g v-else-if="name === 'search'">
      <circle cx="10" cy="10" r="6" />
      <path d="m15 15 6 6" />
    </g>
    <g v-else-if="name === 'more'" fill="currentColor" stroke="none">
      <circle cx="5" cy="12" r="1.5" />
      <circle cx="12" cy="12" r="1.5" />
      <circle cx="19" cy="12" r="1.5" />
    </g>
    <g v-else-if="name === 'bag'">
      <rect x="4" y="7" width="16" height="14" rx="2" />
      <path d="M8 7V5a4 4 0 0 1 8 0v2m-8 5h8m-4-3v6" />
    </g>
  </svg>
</template>
<script>
export default {
  props: {
    name: { type: String, required: true },
    size: { type: [Number, String], default: 18 },
  },
};
</script>
