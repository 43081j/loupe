import coverage from 'rollup-plugin-istanbul'
import common from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import transform from 'rollup-plugin-babel'
const plugins = [common({ namedExports: { chai: ['expect'] } }), resolve(), transform()]
export default [
  {
    input: 'index.js',
    output: {
      file: 'loupe.js',
      name: 'loupe',
      format: 'umd',
    },
    plugins,
  },
  {
    input: 'test/index.js',
    output: {
      file: 'loupe.test.js',
      name: 'loupe',
      format: 'umd',
    },
    plugins: [...plugins, coverage({ exclude: 'test/*.js' })],
  },
]
