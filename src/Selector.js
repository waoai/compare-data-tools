// @flow

import React, {
  useState,
  useEffect,
  useRef,
  createContext,
  useContext
} from "react"
import { styled, makeStyles } from "@material-ui/core/styles"
import * as colors from "@material-ui/core/colors"
import Select from "@material-ui/core/Select"
import MenuItem from "@material-ui/core/MenuItem"
import FormHelperText from "@material-ui/core/FormHelperText"
import FormControl from "@material-ui/core/FormControl"
import InputLabel from "@material-ui/core/InputLabel"

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 150
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  select: {
    backgroundColor: "#fff",
    "& .MuiSelect-select:focus": {
      backgroundColor: "#fff"
    }
  }
}))

const SelectorContext = createContext()

export const SelectorProvider = ({ children, initialValues, onChange }) => {
  const [state, changeState] = useState(initialValues)
  return (
    <SelectorContext.Provider
      value={{
        onChange: (key, value) => {
          const newState = { ...state, [key]: value.toLowerCase() }
          changeState(newState)
          onChange(newState)
        },
        initialValues
      }}
    >
      {children}
    </SelectorContext.Provider>
  )
}

export default ({ label, options, name }) => {
  const classes = useStyles()
  const inputLabel = useRef(null)
  const { onChange: onChangeValue, initialValues } = useContext(SelectorContext)
  const [labelWidth, setLabelWidth] = useState(0)
  useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth)
  }, [])
  const [val, changeVal] = useState(initialValues[name] || "")
  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel ref={inputLabel} id={label + "-label"}>
        {label}
      </InputLabel>
      <Select
        labelId={label + "-label"}
        id={label + "-select"}
        value={val}
        onChange={e => {
          changeVal(e.target.value)
          onChangeValue(name, e.target.value)
        }}
        labelWidth={labelWidth}
        className={classes.select}
      >
        <MenuItem value="">
          <em>Don't Care</em>
        </MenuItem>
        {options.map(o => (
          <MenuItem key={o} value={o.toLowerCase()}>
            {o}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
