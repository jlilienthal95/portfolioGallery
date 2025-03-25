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
    class="rounded-sm object-contain gallery-item image snap-center snap-always"
    class:notExpanded={!isHovered}
    class:expanded={isHovered}
    on:mouseenter={() => isHovered = true}
    on:mouseleave={() => isHovered = false}
  /> 

  <style>
    @media (min-width: 767px) {
    .notExpanded {
      height: 300px;
    }

    .expanded {
      height: 70%;
    }
  }

    @media (max-width: 767px) {
      .notExpanded {
      width: 100%;
      min-width: 300px;
      max-width: 400px;
    }

    .expanded {
      width: 100%;
      max-width: 500px;
    }

  }
  </style>