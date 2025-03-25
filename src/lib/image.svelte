<script lang="ts">
    export let imgSrc:string = "";
    export let imgAlt:string = "";
    export let imgId:number = 0;
    const onclick = null;

    let isHovered = false;

    function imageClick(e) {
        const target = e.target;
        // console.log(target.classList);
        // target.classList.add('center-animation', 'expanded');
        return;
    }
</script>

<!-- <button onclick={(e)=>imageClick(e)}> -->
  <img
    id={imgId + ''}
    src={imgSrc}
    alt={imgAlt}
    class="rounded-sm object-contain gallery-item image snap-center snap-always"
    class:notExpanded={!isHovered}
    class:expanded={isHovered}
    onmouseenter={() => isHovered = true}
    onmouseleave={() => isHovered = false}
  /> 
<!-- </button> -->

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