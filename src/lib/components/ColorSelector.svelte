<script lang="ts">
    import "@melloware/coloris/dist/coloris.css";
    import Coloris from "@melloware/coloris";

    export let value: string | undefined;

    Coloris.init();
</script>

<div class="row">
    <div class="colorShowHolder" style="margin-right:-22px">
        <div class="colorShow" style="background-color:{value};" />
    </div>
    <input type="text" class="colorInput" data-coloris bind:value={value} placeholder="-">
</div>

<style>
    .row {
        display: flex;
        align-items: center;
    }

    .colorShowHolder {
        z-index: 2;
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
        padding: 0.90rem 1.5rem 0.85rem 1.5rem;
        background-color: var(--textfieldColor);
        font-size: 1.0rem;
        text-align: center;
        color: var(--fontColor);
        width: 110px;
        height: 1.8rem;
        cursor: pointer;
	    user-select: none;
    }

    .colorInput::placeholder {
        color: var(--fontColor);
    }
</style>
