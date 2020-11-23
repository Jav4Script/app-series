<template>
  <b-carousel-list
    v-model="test"
    :data="items"
    :items-to-show="4"
  >
    <template
      slot="item"
      slot-scope="list"
    >
      <div class="card">
        <div class="card-image">
          <figure class="image is-2by1">
            <a @click="info(list.index)"><img :src="list.image"></a>
          </figure>
        </div>
        <div class="card-content">
          <div class="content">
            <p class="title is-6">
              {{ list.title }}
            </p>
            <p class="subtitle is-7">
              @johnsmith
            </p>
            <div class="field is-grouped">
              <p
                v-if="list.rating"
                class="control"
              >
                <b-rate
                  :value="list.rating"
                  show-score
                  disabled
                />
              </p>
              <p
                class="control"
                style="margin-left: auto"
              >
                <button class="button is-small is-danger is-outlined">
                  <b-icon
                    size="is-small"
                    icon="heart"
                  />
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </template>
  </b-carousel-list>
</template>

<script>
export default {
  name: 'SeriesHighlights',
  data() {
        return {
            test: 0,
            items: [
                {
                    title: 'Slide 1',
                    image: 'https://buefy.org/static/img/placeholder-1280x960.png',
                    rating: 4.4
                },
                {
                    title: 'Slide 2',
                    image: 'https://buefy.org/static/img/placeholder-1280x960.png',
                    rating: 3.5
                },
                {
                    title: 'Slide 3',
                    image: 'https://buefy.org/static/img/placeholder-1280x960.png',
                    rating: 5
                },
                {
                    title: 'Slide 4',
                    image: 'https://buefy.org/static/img/placeholder-1280x960.png'
                },
                {
                    title: 'Slide 5',
                    image: 'https://buefy.org/static/img/placeholder-1280x960.png',
                    rating: 5
                },
                {
                    title: 'Slide 6',
                    image: 'https://buefy.org/static/img/placeholder-1280x960.png',
                    rating: 4
                },
                {
                    title: 'Slide 7',
                    image: 'https://buefy.org/static/img/placeholder-1280x960.png',
                    rating: 2.7
                },
                {
                    title: 'Slide 8',
                    image: 'https://buefy.org/static/img/placeholder-1280x960.png',
                    rating: 1.5
                }
            ]
        }
    },

  methods: {
     getImgUrl(value) {
            value += 50
            return `https://picsum.photos/id/10${value}/1230/500`
        },
        switchGallery(value) {
            this.gallery = value
            if (value) {
                return document.documentElement.classList.add('is-clipped')
            } else {
                return document.documentElement.classList.remove('is-clipped')
            }
        }
  },
}
</script>

<style>

</style>
