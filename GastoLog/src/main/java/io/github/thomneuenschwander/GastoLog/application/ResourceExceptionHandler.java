package io.github.thomneuenschwander.GastoLog.application;

import java.time.Instant;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import io.github.thomneuenschwander.GastoLog.domain.exceptions.CategoryNotFoundException;
import io.github.thomneuenschwander.GastoLog.domain.exceptions.DuplicatedTupleException;
import io.github.thomneuenschwander.GastoLog.domain.exceptions.ImageFormatNotSupportedException;
import io.github.thomneuenschwander.GastoLog.domain.exceptions.ResourceNotFoundException;
import jakarta.servlet.http.HttpServletRequest;

@ControllerAdvice
public class ResourceExceptionHandler {
    @ExceptionHandler(ResourceNotFoundException.class)
	public ResponseEntity<StandardError> resourceNotFound(ResourceNotFoundException e, HttpServletRequest request) {
		String error = "Resource not found";
		HttpStatus status = HttpStatus.NOT_FOUND;
		StandardError err = new StandardError(Instant.now(), status.value(), error, e.getMessage(), request.getRequestURI());
		return ResponseEntity.status(status).body(err);
	}
	@ExceptionHandler(DuplicatedTupleException.class)
	public ResponseEntity<StandardError> duplicatedTuple(DuplicatedTupleException e, HttpServletRequest request) {
		String error = "Data already exists";
		HttpStatus status = HttpStatus.CONFLICT;
		StandardError err = new StandardError(Instant.now(), status.value(), error, e.getMessage(), request.getRequestURI());
		return ResponseEntity.status(status).body(err);
	}
	@ExceptionHandler(ImageFormatNotSupportedException.class)
	public ResponseEntity<StandardError> ImageFormatNotSupported(ImageFormatNotSupportedException e, HttpServletRequest request) {
		String error = "Image format not supported";
		HttpStatus status = HttpStatus.UNSUPPORTED_MEDIA_TYPE;
		StandardError err = new StandardError(Instant.now(), status.value(), error, e.getMessage(), request.getRequestURI());
		return ResponseEntity.status(status).body(err);
	}
	@ExceptionHandler(CategoryNotFoundException.class)
	public ResponseEntity<StandardError> categoryNotFound(CategoryNotFoundException e, HttpServletRequest request) {
		String error = "Category resource not found";
		HttpStatus status = HttpStatus.NOT_FOUND;
		StandardError err = new StandardError(Instant.now(), status.value(), error, e.getMessage(), request.getRequestURI());
		return ResponseEntity.status(status).body(err);
	}
}
