---
home: true
heroText: QiJieH's Blog
tagline: 连宵不寝听微雨，错喜檐花滴数行
# heroImage: /hero.png
# heroImageStyle: {
#   maxWidth: '600px',
#   width: '100%',
#   display: block,
#   margin: '9rem auto 2rem',
#   background: '#fff',
#   borderRadius: '1rem',
# }
bgImage: '/web-img/summer.jpg'
bgImageStyle: {
  height: '450px'
}
isShowTitleInHome: false
---

<p id="hitokoto" :class="$style.hcss"></p>

<style module>
.hcss {
  font-size: 16px;
  text-align: center;
  background-color: var(--background-color);
  border-radius: 0.25rem;
  box-shadow: var(--box-shadow);
  padding: 1rem 1.5rem;
  font-weight:300;
  cursor: pointer;
  transition: all 0.3s;
}
.hcss:hover {
  box-shadow: var(--box-shadow-hover);
}
</style>

<script>
export default {
  mounted () {
    function changeHik() {
      fetch('https://v1.hitokoto.cn/')
      .then(response => response.json())
      .then(data => {
        document.querySelector('#hitokoto').innerHTML = `
          ${data.hitokoto}《${data.from}》
        `;
      })
      .catch(console.error);
    }
    changeHik();
    document.querySelector('#hitokoto').addEventListener('click',function(){
      changeHik();
    })
  }
}
</script>