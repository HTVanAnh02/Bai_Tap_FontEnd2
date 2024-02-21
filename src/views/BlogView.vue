<template>
    <div class="body">
        <h2>Inside Open Art</h2>
        <div class="container">
            <div>
                <img src="../assets/Prison.png" alt="">
                <p>4pt grid system</p>
                <p>Base on 4pt gird system. Our UI KIT help you crate perfect white space</p>
            </div>
            <div>
                <img src="../assets/icon2.png" alt="">
                <p>Color style</p>
                <p>All color in OpenArt are styled. You can change all
design color with one click</p>
            </div>
            <div>
                <img src="../assets/icon3.png" alt="">
                <p>Free font</p>
                <p>OpenArt use Epilogue font family</p>
                <p>Available with open licence in gooogle font</p>
            </div>
            <div>
                <img src="../assets/icon4.png" alt="">
                <p>Darkmode avaiable</p>
                <p>Our UI Kit support darkmode</p>
                <p>Chage your design to dark mode with one click</p>
            </div>
            <div>
                <img src="../assets/icon5.png" alt="">
                <p>Easy to customize</p>
                <p>Create any design with OpenArt UI kits </p>
            </div>
            <div>
                <img src="../assets/icon6.png" alt="">
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
    font-family: Epilogue,sans-serif;
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
h2{
    margin-top: 60px;
    font-size: 40px;
    font-weight: 700;
    text-align: center;
}
.container >div{
    width: 30%;
    background-color: white;
    height: auto;
    margin: 10px;
    color: black;
    border-radius: 5px;
    padding: 20px;
}
.container{
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    justify-content: center;
    margin-top: 30px;
}
.container >div p:nth-child(2){
    margin: 10px;
    font-weight: 500;
}

.container >div p:last-child,.container >div p:nth-child(3){
    opacity: 0.7;
    margin-left: 10px;
}
.container >div img{
    width: 20px;
    margin-left: 10px;
}
.container >div p{
    font-size: 16px;
    line-height: 21px;
}
</style>