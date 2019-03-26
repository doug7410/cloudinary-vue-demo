<template>
    <div id="app">
        <cld-context>
            <cld-transformation crop="scale" width="150" quality="80"/>
            <cld-transformation v-bind="options"/>
            <ul class="profile-pics">
                <li v-for="(filter, index) in randomFilters" :key="index">
                    <!--dougandangie/IMG_1682 is the name of the image inside my cloud-->
                    <cld-image publicId="dougandangie/IMG_1682" :effect="filter"/>
                </li>
            </ul>
        </cld-context>

        <h1>My Cloudinary Photos!</h1>

        <div class="thumbnail-photos">
            <ul>
                <li v-for="(photo, index) in photos" :key="index">
                    <cld-image :publicId="photo"
                               crop="fill"
                               width="220"
                               height="220"
                               gravity="face"
                               @click.native.prevent="modalPhoto = photo"
                    />
                </li>
                <li>
                    <cld-video cloudName="demo"
                               publicId="dog"
                               crop="fill"
                               ref="dog"
                               width="220"
                               height="220"
                               muted
                               preload="auto"
                               @mouseover.native="playVideo()"
                               @mouseout.native="stopVideo()"
                    >
                        <cld-poster publicId="dog">
                            <cld-transformation
                                    crop="fill"
                                    width="220"
                                    height="220"
                            />
                        </cld-poster>
                    </cld-video>
                </li>
            </ul>
        </div>

        <div v-if="modalPhoto">
            <div class="modal-overlay"></div>
            <div class="modal">
                <div class="close" @click="closeModal">X</div>
                <cld-image :publicId="modalPhoto" crop="scale" :width="1000"/>
            </div>
        </div>
    </div>
</template>

<script>
  import {shuffle} from 'underscore'

  export default {
    name: 'app',
    data() {
      return {
        options: {
          crop: "crop",
          height: "150",
          width: "150",
          gravity: "face",
        },
        filters: [
          'grayscale',
          'assist_colorblind',
          'blue:100',
          'sepia:80',
          'red:100',
          'vectorize'
        ],
        photos: [
          'eistvuj52pu3lrmyvu0f.jpg',
          'ac59x7v0cxfbs85i3fcs.jpg',
          'rl44ktq1rpvduflogfd8.jpg',
          'n3jeqwfpv80izf2keglf.jpg',
          'gxvfkylonpxzc6cdumgn.jpg',
          'dz8quzktblrz2sypuzsa.jpg',
          'aenfkq4ilp6xqbp75hmn.jpg',
          'o9dlcqnfudsfi4pgn08e.jpg',
          'kfeaws4nzhcdkhontqmu.jpg',
          'mhhnh15ymkddid0biaih.jpg',
          'h7qtqn88rxiviu9owdoj.jpg',
          'vshafxww0xe7jzrgplz6.jpg',
          'jke4ovqt2qyrcacvqska.jpg',
          'nwykjgmtibgqe1xtkilk.jpg',
          'countdown/new-zealand-10.jpg',
          'countdown/new-zealand-12.jpg',
          'countdown/new-zealand-6.jpg',
          'countdown/new-zealand-8.jpg',
          'countdown/new-zealand-4.jpg',
          'countdown/new-zealand-9.jpg',
          'dougandangie/IMG_2259.jpg',
          'dougandangie/IMG_1586.jpg',
          'dougandangie/IMG_5278.jpg',
          'dougandangie/IMG_0986.jpg',
        ],
        modalPhoto: ''
      }
    },
    computed: {
      randomFilters() {
        const filers = shuffle(this.filters)
        return filers.slice(0, 4)
      }
    },
    methods: {
      playVideo() {
        this.$refs.dog.$el.play().catch(() => {
          // catch something
        })
      },
      stopVideo() {
        this.$refs.dog.$el.pause()
      },
      closeModal() {
        this.modalPhoto = null
      }
    },
    created() {
      document.addEventListener('keyup', (e) => {
        if (e.key === 'Escape') {
          this.closeModal()
        }
      })
    }
  }
</script>

<style lang="scss">
    @import url('https://fonts.googleapis.com/css?family=Lobster');
    @import "~cloudinary-vue/dist/Cloudinary.css";

    #app {
        display: flex;
        justify-content: space-around;
        flex-direction: column;
        align-items: center;
        color: #099a38;
        font-family: 'Lobster', cursive;

        h1 {
            font-size: 45px;
            margin: 0 0 20px 0;
        }
    }

    .profile-pics {
        list-style: none;

        li {
            display: inline-block;
            margin: 8px;
            height: 150px;
            border-radius: 100px;
            overflow: hidden;
            border: solid 3px #ccc;
        }
    }

    .thumbnail-photos {
        ul {
            list-style: none;
            text-align: center;
            margin: 0;
            padding: 0;

            li {
                display: inline-block;
                margin-top: -4px;
            }
        }
    }

    .modal {
        position: fixed;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        z-index: 100;
        box-shadow: 3px 3px 12px #888;

        &-overlay {
            position: fixed;
            top: 0;
            right: 0;
            left: 0;
            bottom: 0;
            background-color: #fff;
            z-index: 99;
            opacity: .7;
        }

        .close {
            position: absolute;
            right: 15px;
            top: 15px;
            font-size: 55px;
            color: black;
            cursor: pointer;
            text-shadow: antiquewhite 2px 2px 9px;

            &:hover {
                color: blue;
            }
        }

    }
</style>