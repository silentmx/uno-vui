<script setup lang="ts">
import { VPTeamMembers } from 'vitepress/theme';

const teamMembers = [
  {
    avatar: 'https://www.github.com/silentmx.png',
    name: 'silentmx',
    title: 'Author, Core team member of UnoCSS & OnuUI',
    links: [
      { icon: 'github', link: 'https://github.com/silentmx' },
    ],
  }
];

const SpecialMembers = [{
  avatar: 'https://www.github.com/antfu.png',
  name: 'Anthony Fu',
  desc: 'Core team member of Vite & Vue & Unocss & vitepress',
  title: 'A fanatical open sourceror, working',
  org: 'NuxtLabs',
  orgLink: 'https://nuxtlabs.com/',
  links: [
    { icon: 'github', link: 'https://github.com/antfu' },
  ],
}];
</script>

<template>
  <main class="flex flex-col">
    <div class="vp-doc flex flex-col items-center">
      <h2 id="meet-the-team" op50 font-normal>特别鸣谢</h2>
      <div m-auto>
        <VPTeamMembers size="medium" :members="SpecialMembers" />
      </div>
    </div>
  </main>
</template>