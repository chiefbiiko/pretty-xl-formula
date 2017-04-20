# sprintl - sprint to a defaulted named list

sprintl <- function(nms, dflt=NULL) {
  stopifnot(is.character(nms), length(nms) > 0L)
  x <- vector('list', length(nms))
  if (!is.null(dflt)) x <- lapply(x, function(x) dflt)
  names(x) <- nms
  return(x)
}