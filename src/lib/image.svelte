<script lang="ts">
    export let imgSrc:string = ""
    export let imgAlt:string = ""
    export let imgId:number = 0

    let isHovered = false;
</script>


  <img
    id={imgId + ''}
    src={imgSrc}
    alt={imgAlt}
    class="rounded-sm object-contain gallery-item image duration-2000"
    class:notExpanded={!isHovered}
    class:expanded={isHovered}
    on:mouseenter={() => isHovered = true}
    on:mouseleave={() => isHovered = false}
  /> 

  <style>
    .notExpanded {
      height: 300px;
    }

    .expanded {
      height: 500px;
    }
  </style>