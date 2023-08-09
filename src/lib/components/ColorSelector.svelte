<script lang="ts">
    import "@melloware/coloris/dist/coloris.css";
    import Coloris from "@melloware/coloris";

    export let value: string | undefined;

    Coloris.init();
</script>

<div class="row">
    <input type="text" class="colorInput" data-coloris bind:value={value} placeholder="-">
    <div class="colorShowHolder" style="margin-right:-22px">
        <div class="colorShow" style="background-color:{value};" />
    </div>
</div>

<style>
    .row {
        display: flex;
        align-items: center;
    }

    .colorShowHolder {
        z-index: 2;
        margin-left: 0.5rem;
    }

    .colorShow {
        width: 16px;
        height: 16px;
        border-radius: 50%;
        border: 1px solid white;
    }

    .colorInput {
        border: 1px solid var(--fontColor);
        border-radius: 4px;
        background-color: var(--textfieldColor);
        font-size: 1.0rem;
        color: var(--fontColor);
        width: 100px;
        height: 2.2rem;
        padding-left: 0.5rem;
        cursor: pointer;
	    user-select: none;
    }

    .colorInput::placeholder {
        color: var(--fontColor);
    }
</style>
