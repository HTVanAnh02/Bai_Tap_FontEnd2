<template>
    <div class="body">
        <h2>Inside Open Art</h2>
        <div class="container">
            <div>
                <v-img src="../assets/icon/Prison.png" height="30" width="30" class="child-icon" />
                <p style="width: 181px;height: 25px; font-size: 24px; font-family: Epilogue, sans-serif;">4pt grid system
                </p>
                <p
                    style="width: 396px; height: 42px; font-size: 16px; font-family: Epilogue, sans-serif; line-height: 21px;">
                    Base on 4pt gird system. Our UI KIT helps you create perfect white space</p>
                <p style="width: 396px;height: 42px; font-size: 16px; font-family: Epilogue, sans-serif;">Base on 4pt gird
                    system. Our UI KIT help you crate perfect white space</p>
            </div>
            <div>
                <v-img src="../assets/icon/Color Dropper.png" height="30" width="30" class="child-icon" />
                <p>Color style</p>
                <p>All color in OpenArt are styled. You can change all
                    design color with one click</p>
            </div>
            <div>
                <v-img src="../assets/icon/Vector.png" height="30" width="30" class="child-icon" />
                <p>Free font</p>
                <p>OpenArt use Epilogue font family</p>
                <p>Available with open licence in gooogle font</p>
            </div>
            <div>
                <v-img src="../assets/icon/Toggle On.png" height="30" width="30" class="child-icon" />
                <p>Darkmode avaiable</p>
                <p>Our UI Kit support darkmode</p>
                <p>Chage your design to dark mode with one click</p>
            </div>
            <div>
                <v-img src="../assets/icon/Design.png" height="30" width="30" class="child-icon" />
                <p>Easy to customize</p>
                <p>Create any design with OpenArt UI kits </p>
            </div>
            <div>
                <v-img src="../assets/icon/Four Squares.png" height="30" width="30" class="child-icon" />
                <p>Variant components</p>
                <p>All component art variant, easy to design,
                    easy to control</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
    box-shadow: 0;
    font-family: Epilogue, sans-serif;
}

.body {
    background-image: url('../assets/3.png');
    width: 100%;
    background-size: cover;
    background-position: center center;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
}

h2 {
    width: 455px;
    height: 64px;
    margin-top: 116.56px;
    left: 597.66px;
    font-family: Epilogue, sans-serif;
    font-weight: 700;
    font-size: 56px;
    line-height: 64px;
    text-align: center;
}

.container>div {
    width: 30%;
    background-color: white;
    height: auto;
    margin: 10px;
    color: black;
    border-radius: 5px;
    padding: 20px;
}

.container {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    justify-content: center;
    margin-top: 30px;
}

.container>div p:nth-child(2) {
    margin: 10px;
    font-weight: 500;
}

.container>div p:last-child,
.container>div p:nth-child(3) {
    opacity: 0.7;
    margin-left: 10px;
}

.container>div img {
    width: 20px;
    margin-left: 10px;
}

.container>div p {
    font-size: 16px;
    line-height: 21px;
}</style>