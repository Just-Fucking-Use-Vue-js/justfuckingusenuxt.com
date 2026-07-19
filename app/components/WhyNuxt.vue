<script lang="ts" setup>
defineSlots<{
  title: (props: {}) => any
  default: (props: {}) => any
  link: (props: {}) => any
}>()

const items = [{}]
</script>

<template>
  <UAccordion
    :items="items"
    :ui="{
      trigger: 'py-2 text-lg font-normal',
      content: 'pb-2 text-base',
      trailingIcon: 'hidden',
    }"
  >
    <template #default>
      <slot
        mdc-unwrap="p"
        name="title"
      />
    </template>

    <template #content>
      <div class="text-muted">
        <slot
          mdc-unwrap="p"
          name="default"
        />
      </div>

      <div class="pt-2">
        <slot
          mdc-unwrap="p"
          name="link"
        />
      </div>
    </template>
  </UAccordion>
</template>
