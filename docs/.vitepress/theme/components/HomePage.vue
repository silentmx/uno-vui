<script setup lang="ts">
import { VPTeamMembers } from 'vitepress/theme';
import { teamMembers } from '../../contributors';
</script>

<template>
  <div class="content">
    <div class="content-container">
      <main class="main">
        <div class="vp-doc" flex flex-col items-center mt-10>
          <h2 id="meet-the-team" op70 font-normal p="t-10 b-2">开发团队</h2>
          <div>
            <VPTeamMembers size="small" :members="teamMembers" />
          </div>
        </div>
      </main>
    </div>
  </div>
</template>